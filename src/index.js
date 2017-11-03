const request = require('superagent')

let form = document.getElementById('form-data')

form.addEventListener('submit', (ev) => {
  ev.preventDefault()

  if (ev.target['input-file'].files[0].type == 'text/plain') {
    let element = document.getElementById('loading')
    element.className = ''

    let fd = new FormData();
    fd.append('file', ev.target['input-file'].files[0]);

    request
      .post('/api/challenge')
      .send(fd)
      .set('Content-Type', undefined)
      .set('enctype', 'multipart/form-data')
      .end((err, res) => {
        if (err) console.log(err)
        else {
          element.className = 'hide'
          console.log(res);
        }
      })

  }
})
