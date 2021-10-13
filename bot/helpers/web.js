const express = require('express')
const app = express()
const path = require('path')
const viewPath = path.join(__dirname, './views')

app.set('views', viewPath);
app.set('view engine' ,'ejs')

const web = (port,username,db) => {
  app.get('/', (req,res) => {
  res.render('index',{invite:"https://t.me/" + username})
  })
  app.get('/:id', async (req, res) => {
    const { id } = req.params;
    const user = await db.get(id);
    if (user) {
        res.render('info',{info:user})
    } else {
        res.status(404).json({"message": "user not found"});
    }})
  app.listen(port)
}
 
module.exports = {web}