const express = require('express')
const app = express()
const path = require('path')
const viewPath = path.join(__dirname, './views')

app.set('views', viewPath);
app.set('view engine' ,'ejs')

const web = (port,username) => {
  app.get('/', (req,res) => {
  res.render('index',{invite:"https://t.me/" + username})
  })
  app.listen(port)
}

module.exports = {web}