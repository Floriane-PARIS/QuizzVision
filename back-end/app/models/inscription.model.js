const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Inscription', {
  name: Joi.string().required(),
  password: Joi.number().required(),
  animateurId: Joi.number(),
  connexions: Joi.array(),
})