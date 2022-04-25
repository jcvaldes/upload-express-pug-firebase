const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    validate: {
      validator: function (url) {
        return url.indexOf('.jpg') != -1
      },
      message: 'Por favor, sólo imágenes JPG',
    },
  },
})
module.exports = mongoose.model('Product', ProductSchema)
