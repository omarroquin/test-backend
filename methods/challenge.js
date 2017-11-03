const challenge = {
  processData: input => {
    return new Promise((resolve, reject) => {
      let queries = []
      let index = 1;
      try {
        input = input.split('\n')

        for (let i = 0; i < parseInt(input[0]); i++) {
          let line = input[index].split(' ')

          let Matrix = challenge.createMatrix(parseInt(line[0]))
          index++

          // Make operations
          for (let i = 0; i < parseInt(line[1]); i++) {
            let line = input[index].split(' ')
            index++

            if (line[0].indexOf('UPDATE') === 0) {
              let data = line.map(x => parseInt(x) - 1)

              Matrix[data[1]][data[2]][data[3]] = data[4] + 1
            } else if (line[0].indexOf('QUERY') === 0) {
              let data = line.map(x => parseInt(x) - 1)

              queries.push(challenge.queryCalculate(Matrix, data[1], data[2], data[3], data[4], data[5], data[6]))
            }
          }
        }
      } catch (err) {
        reject(err)
      } finally {
        resolve(queries)
      }
    })
  },
  createMatrix: N => {
    // Definition Matrix 3-D
    let Matrix = []

    for (let i = 0; i < N; i++) {
      Matrix.push([])
      for (let j = 0; j < N; j++) {
        Matrix[i].push([])
        for (let l = 0; l < N; l++) {
          Matrix[i][j].push([])
          Matrix[i][j][l] = 0
        }
      }
    }

    return Matrix
  },
  queryCalculate: (Matrix, x1, y1, z1, x2, y2, z2) => {
    // Calculate query
    let query = 0
    for (let i = x1; i <= x2; i++) {
      for (let j = y1; j <= y2; j++) {
        for (let l = z1; l <= z2; l++) {
          query += Matrix[i][j][l]
        }
      }
    }
    return query
  }
}

module.exports = challenge
