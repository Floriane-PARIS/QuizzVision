const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Animateur', {
  name: Joi.string().required(),
  password: Joi.number().required(),
  user: Joi.array(),

})