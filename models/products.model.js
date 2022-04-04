const mongoose = require('mongoose');

const Schema = mongoose.Schema;
//Modelo de la bd
const productSchema = new Schema({
  id:     String,
  name:   String,
  price:  Number,
  image:  String
});
const model = mongoose.model('products', productSchema);
module.exports = model;
