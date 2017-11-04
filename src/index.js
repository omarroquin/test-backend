const request = require('superagent')

let form = document.getElementById('form-data')

form.addEventListener('submit', (ev) => {
  ev.preventDefault()
  let file = ev.target['input-file'].files[0]

  if (file && (file.type === 'text/plain')) {
    let element = document.getElementById('loading')
    let fd = new FormData()

    element.className = ''
    fd.append('file', file)

    request
      .post('/api/processData')
      .send(fd)
      .set('Content-Type', undefined)
      .set('enctype', 'multipart/form-data')
      .end((err, res) => {
        if (err) console.log(err)
        else {
          let container = document.getElementById('results')
          container.className = ''
          element.className = 'hide'
          res.body.data.forEach(i => {
            container.innerHTML += '<li>' + i + '</li>'
          })
        }
      })
  }
})
