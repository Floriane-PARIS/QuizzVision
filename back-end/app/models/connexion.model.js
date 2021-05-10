const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Connexion', {
  name: Joi.string().required(),
  password: Joi.number().required(),
  inscriptionId: Joi.number(),
})