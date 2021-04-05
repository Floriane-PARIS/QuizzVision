const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Configuration', {
  bold: Joi.string().required(),
  size: Joi.number().required(),
  police: Joi.string().required(),
})