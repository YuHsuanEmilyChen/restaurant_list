const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Define new Schema
const restaurantSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  rating: {
    type: mongoose.Types.Decimal128,
    required: true
  },
  google_map: {
    type: String
  },
  name_en: {
    type: String,
  }
})

module.exports = mongoose.model('Restaurant', restaurantSchema)
