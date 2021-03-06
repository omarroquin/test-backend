const express = require('express')
const router = express.Router()
const fs = require('fs')
const processData = require('../methods/processData')

/* POST input data */
router.post('/processData', (req, res) => {
  let inputFile = req.files.file
  let inputPath = 'uploads/input.txt'

  // Use the mv() method to place the file somewhere on your server
  inputFile.mv(inputPath, err => {
    if (err) res.status(500).send(err)

    fs.readFile(inputPath, 'utf8', (err, data) => {
      if (err) res.status(500).send(err)

      processData(data)
        .then(response => {
          res.status(200).send({data: response})
        }).catch(err => {
          res.status(500).send(err)
        })
    })
  })
})

module.exports = router
