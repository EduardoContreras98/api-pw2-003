const express = require('express');
const app = express();
const port = 3000;

//Endpoint
app.get('/', (req, res) => {
  res.json({
    success: true,
    statuscode: 200,
    message: 'Hola soy un endpoint'
  });
});

app.get('/products', (req, res) => {
  res.json([{
    name: 'JABON EN BARRA',
    price: 25.50
  },
  {
    name: 'DETERGENTE EN GEL',
    price: 15.50
  },
  {
    name: 'PASTA DE DIENTES COLGATE',
    price: 17.5
  },
  ]);
});

app.listen(port, () =>{
  console.log('Estoy en el puerto ' + port);
});
