const express = require('express');
const routerApi = require('./routes');
const { logErrors, boomErrorHandler, errorHandler } = require('./middlewares/error.handler');
const db = require('./db');
const { DBCONNECTION } = require('./consts.json');
const app = express();
const port = 3000;

db(DBCONNECTION);

app.use(express.json()); //UTILIZAREMOS JSON COMO FORMATO DE DATOS
routerApi(app); //RUTAS DE NUESTRAS ENTIDADES
//MIDDLEWARE CODIGO INTERMEDIARIO => MANEJO DE ERRORES BOOM, VALIDACIONES JOI
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () =>{
  // eslint-disable-next-line no-console
  console.log('Estoy en el puerto ' + port);
});
