const faker = require('faker')
const boom = require('@hapi/boom');
const ProductModel = require('../models/products.model');

class ProductService{
  constructor()
  {
    this.products = [];
    this.generate();
  }

  generate(){
    const limit = 100;
    for (let index = 0; index < limit; index++)
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl()
      });
  }

  find(size){
    const products = products.filter((item, index) => item && index < size);
    if(!products)
      throw boom.notFound('No se encontro el catalogo solicitado');
    else if (products.length <= 0)
      throw boom.notFound('No hay productos registrados todavia');
    return products;
  }

  create(data){
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data //PASAR TODOS LOS ELEMENTOS
    }
    this.products.push(newProduct);
    return newProduct;
  }

  findOne(id){
    const product = this.products.find((item) => item.id === id)
    if(!product)
      throw boom.notFound('El producto no fue encontrado');
    return product;
  }

  update(id, changes){
    const index = this.products.findIndex(item => item.id === id);
    if(index === -1)
      throw boom.notFound('Producto no encontrado'); //FORMA CON BOOM
      //throw new Error('Product not found'); FORMA TRADICIONAL

    var currentProduct = this.products[index];
    this.products[index] = {
      ...currentProduct,
      ...changes
    };
    return {
      old: currentProduct,
      changed: this.products[index]
    };
  }

  delete(id){
    const index = this.products.findIndex(item => item.id === id);
    if(index === -1)
      throw boom.notFound('El producto no fue encontrado');
    var currentProduct = this.products[index];
    this.products.splice(index, 1);
    return currentProduct;
  }

  //DB METHODS

  async findDB(limit, filter){
    let productsDB = await ProductModel.find(filter);
    if(!productsDB)
      throw boom.notFound('No se encontro el catalogo solicitado');
    else if (productsDB.length <= 0)
      throw boom.notFound('No hay productos registrados todavia');
    productsDB = limit ? productsDB.filter((item, index) => item && index < limit) : productsDB;
    return productsDB;
  }

  async createDB(data){
    const model = new ProductModel(data);
    await model.save();
    return data;
  }

  async findOneDB(id){
    /*var regexTextId = "^[a-zA-Z0-9_]*$";
    var rgxId = new RegExp(regexTextId);
    if(!rgxId.test(id))
      throw boom.badRequest("El id no tiene el formato correcto");*/
    try {
    const product = await ProductModel.findOne({
      _id: id
    });
    if(product == undefined || product == null)
      throw boom.notFound('No se encontro el catalogo');
    else if(product.length <= 0)
      throw boom.notFound('No se encontro ningun registros');
    return product
    } catch (error) {
      throw boom.conflict("Ha ocurrido un error, favor de comunicarse con el administrador" + error.message);
    }
  }

  async updateDB(id, changes){
    let product = await ProductModel.findOne({
      _id: id
    });
    let productOriginal = {
      name: product.name,
      price: product.price
    };
    const {name, price} = changes;
    product.name = name;
    product.price = price;
    product.save();

    return{
      original: productOriginal,
      actualizado: product
    }
  }

  async deleteDB(id){
    let product = await ProductModel.findOne({
      _id: id
    });
    const {deletedCount} = await ProductModel.deleteOne({
      _id: id
    });
    if(deletedCount <= 0)
      throw boom.notFound('El registro seleccionado no existe');
    return product;
  }
}



module.exports = ProductService;
