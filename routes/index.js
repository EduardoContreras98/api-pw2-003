const express = require('express');
const productsRouter = require('./products.router');

const routerApi = (app) =>{
  const router = express.Router();
  app.use('/api/v1', router);
  //Endpoints de la v1
  router.use('/products', productsRouter);
}

module.exports = routerApi;
