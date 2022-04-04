const Joi = require('joi');

//SCHEMA PARA DATOS REQUERIDOS Y LOGICA DE NEGOCIO
const id = Joi.string().alphanum();
const name = Joi.string().alphanum().min(3).max(15);
const price = Joi.number().integer().min(10);

const createProductDto = Joi.object({
  name: name.required(),
  price: price.required()
});

const updateProductDto = Joi.object({
  name: name,
  price: price
});

const getProductId = Joi.object({
  id: id.required()
});

module.exports = { createProductDto, updateProductDto, getProductId };
