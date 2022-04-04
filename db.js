const db = require('mongoose');
db.Promise = global.Promise; //

const connect = async (url) =>{
  await db.connect(url, {
    useNewUrlParser: true //Compatibilidad de servidor
  });
  // eslint-disable-next-line no-console
  console.log('se ha conectado a la bd');
}

module.exports = connect;
