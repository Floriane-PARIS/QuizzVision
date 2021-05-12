const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Animateur', {
  name: Joi.string().required(),
  mail: Joi.string().required,
  password: Joi.string().required(),
  passwordConfirmed: Joi.string().required,
  //user: Joi.array(),

})