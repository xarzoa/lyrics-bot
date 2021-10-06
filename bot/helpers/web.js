const express = require('express')
const app = express()

const web = (port) => {
  app.get('/', (req, res) => {
  res.send('Hello World!')
  })
    
  app.listen(port)
}

module.exports = {web}