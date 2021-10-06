const express = require('express')
const path = require('path')
const app = express()

const web = (port) => {
  app.set('views' , path.join( './', "views"))
  app.set('view engine' ,'ejs')
  app.get('/', (req, res) => {
  res.render('index')
  })
    
  app.listen(port)
}

module.exports = {web}