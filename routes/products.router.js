const express = require('express');
const ProductService = require('../services/products.service');
const service = new ProductService();
const validatorHandler = require('./../middlewares/validator.handler');
const { createProductDto, updateProductDto, getProductId } = require('../dtos/products.dto');

const router = express.Router();


//RUTAS GENERALES
//GET ALL PRODUCTS
router.get('/', async (req, res, next) => {
  try{
    const { size } = req.query;
    const filter = req.body;
    const products = await service.findDB(size || 10, filter)
    res.json({
      'Success': true,
      'Message': 'Estos son los productos encontrados',
      'Data': products
    });
  }catch(error){
    next(error);
  }
});

//CREATE PRODUCTS
router.post('/', validatorHandler(createProductDto, 'body'), async (req, res) => {
    const body = req.body;
    const product = await service.createDB(body);
    res.json({
       'success': true, //VALIDACIONES FRONTEND
       'message': 'El producto se ha creado con exito', //MOSTRAR AL USUARIO
       'Data': product //DESPLIEGA LA INFORMACIÓN EN ALGÚN FORMATO
   });
});

//RUTAS ESPECIFICAS /:id

//GET PRODUCTS BY ID
router.get('/:id', validatorHandler(getProductId, 'params'), async (req, res, next) => {
  try {
    const { id }  = req.params;
    const product = await service.findOneDB(id);
      res.json({
        'success': true,
        'message': "Este es el producto encontrado",
        'Data': product
    });
  } catch (error) {
    next(error);
  }
});

//PUT = TODOS LOS CAMPOS SE DEBEN ACTUALIZAR
//PATCH = ACTUALIZACIÓN PARCIAL DE CAMPOS (PODEMOS ACTUALIZAR ALGUNOS)

router.patch('/:id', validatorHandler(getProductId, 'params'), validatorHandler(updateProductDto, 'body'), async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const { original, actualizado } = await service.updateDB(id, body);
      res.json({
        'success': true,
        'message': "Se ha actualizado el siguiente registro",
        'Data': {
          "Original": original,
          "Modificado": actualizado
        }
      });
    } catch (error) {
      next(error);
    }
});

router.delete('/:id', validatorHandler(getProductId, 'params'), async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await service.deleteDB(id);
      res.json({
        'success': true,
        'message': "El siguiente registro se ha eliminado correctamente",
        'Data': product
      });
    } catch (error) {
      next(error)
    }
});

module.exports = router;
