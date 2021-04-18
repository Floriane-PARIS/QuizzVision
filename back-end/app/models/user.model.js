const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('User', {
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  encadreur: Joi.string().required(),
  maladies: Joi.string().required(),
  commentaires: Joi.string().required(),
  age: Joi.number().required(),
})
