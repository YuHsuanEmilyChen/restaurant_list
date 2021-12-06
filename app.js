// Request packages to use in the project
const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
// const restaurantList = require('./restaurant.json')

// 載入model
const Restaurant = require('./models/restaurant')

// Connect MongoDB
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/restaurant_list')
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})

// Set template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// Set static files
app.use(express.static('public'))

// Set routes
// CRUD - Read
app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(diners => res.render('index', { diners }))
    .catch(error => console.log('error'))
})
// app.get('/', (req, res) => {
//   res.render('index', { diners: restaurantList.results })
// })


app.get('/restaurants/:diner_id', (req, res) => {
  const diner = restaurantList.results.find(diner => diner.id.toString() === req.params.diner_id)
  res.render('card', { dinerOne: diner })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim()
  const diners = restaurantList.results.filter(diner => {
    return diner.name.toLowerCase().includes(keyword.toLowerCase()) || diner.category.includes(keyword)
  })
  // object literal extension { diners: diners, keyword: keyword}
  res.render('index', { diners, keyword })
})

// Start and Listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})