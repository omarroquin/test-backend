const processData = input => {
  return new Promise((resolve, reject) => {
    let Matrix = new MatrixBlock()
    let index = 1

    try {
      input = input.split('\n')

      for (let i = 0; i < parseInt(input[0]); i++) {
        let line = input[index].split(' ')
        Matrix.initializeMatrix(parseInt(line[0]))
        index++

        // Make operations
        for (let i = 0; i < parseInt(line[1]); i++) {
          let line = input[index].split(' ')
          index++

          if (line[0].indexOf('UPDATE') === 0) {
            let data = line.map(x => parseInt(x) - 1)
            Matrix.update(data[1], data[2], data[3], data[4] + 1)
          } else if (line[0].indexOf('QUERY') === 0) {
            let data = line.map(x => parseInt(x) - 1)
            Matrix.query(data[1], data[2], data[3], data[4], data[5], data[6])
          }
        }
      }

    } catch (err) {
      const functionError = new EvalError()
      functionError.message = err.message
      functionError.stack = err.stack
      reject(functionError)
    } finally {
      resolve(Matrix.queries)
    }
  })
}

class MatrixBlock {
  constructor() {
    this.queries = []
  }

  initializeMatrix (N) {
    this.Matrix = []
    for (let i = 0; i < N; i++) {
      this.Matrix.push([])
      for (let j = 0; j < N; j++) {
        this.Matrix[i].push([])
        for (let l = 0; l < N; l++) {
          this.Matrix[i][j].push([])
          this.Matrix[i][j][l] = 0
        }
      }
    }
  }

  update (x, y, z, W) {
    this.Matrix[x][y][z] = W
  }

  query (x1, y1, z1, x2, y2, z2) {
    // Calculate query
    let query = 0
    for (let i = x1; i <= x2; i++) {
      for (let j = y1; j <= y2; j++) {
        for (let l = z1; l <= z2; l++) {
          query += this.Matrix[i][j][l]
        }
      }
    }
    this.queries.push(query)
  }
}

module.exports = processData
