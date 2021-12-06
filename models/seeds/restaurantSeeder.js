//載入model
const Restaurant = require('../restaurant')
// 載入default data
const defaultList = require('./restaurant.json').results

// Connect MongoDB
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/restaurant_list')
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  Restaurant.create(defaultList)
  console.log('done!')
})

