const boom = require('@hapi/boom');

//DTO => DATA TRANSFER OBJECT => MODELO DE DATOS => MODELO DE CRITERIO DE DATOS
const validatorHandler = (dto, prop) => {
  return (req, res, next) => {
    const data = req[prop];
    const { error } = dto.validate(data);
    if(error)
      next(boom.badRequest(error));
    next();
  };
}

module.exports = validatorHandler;
