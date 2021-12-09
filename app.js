// Request packages to use in the project
const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
// const Swal = require('sweetalert2')

// Load model
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

// Create a custom helper
// const hbs = exphbs.create({
//   defaultLayout: 'main',
//   helpers: {
//     searchAlert: function (keyword) {
//       return `<script> Swal.fire({
//         icon: 'error',
//         title: 'Oops...',
//         text: '${keyword}',
//         confirmButtonText:'OK'
//       })</script>`
//     },
//     sayHi: function (keyword) {
//       return "<h1>" + keyword + "</h1>"
//     }
//   }
// })

// Set template engine
// app.engine('handlebars', hbs.engine)
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// Set static files
app.use(express.static('public'))

// Set routes
// CRUD - Read index
app.get('/', (req, res) => {
  return Restaurant.find()
    .lean()
    .then(diners => res.render('index', { diners }))
    .catch(error => console.log('index error'))
})

// CRUD - Read detail
app.get('/restaurants/:id', (req, res) => {
  return Restaurant.findById(req.params.id)
    .lean()
    .then((diner) => { res.render('card', { dinerOne: diner }) })
    .catch(error => console.log('card error'));
})

// CRUD - Read search result
app.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim()
  return Restaurant.find()
    .lean()
    .then(diners => {
      const filtered_diner = diners.filter(diner => {
        return diner.name.toLowerCase().includes(keyword.toLowerCase()) || diner.category.includes(keyword)
      })
      res.render('index', { diners: filtered_diner, keyword })
    })
    .catch(error => console.log('error'))
})


// Start and Listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})