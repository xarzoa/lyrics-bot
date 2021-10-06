const express = require('express')
const app = express()

const web = (port) => {
  app.set('view engine' ,'ejs')
  app.get('/', (req, res) => {
  res.render('./bot/helpers/views/index')
  })
    
  app.listen(port)
}

module.exports = {web}