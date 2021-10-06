const express = require('express')
const app = express()

const web = (port) => {
  app.set('views' , './views')
  app.set('view engine' ,'ejs')
  app.get('/', (req, res) => {
  res.render('index.ejs')
  })
    
  app.listen(port)
}

module.exports = {web}