const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Configuration', {
  handicap: Joi.string().required(),
  bold: Joi.string().required(),
  size: Joi.number().required(),
  police: Joi.string().required(),
  bright: Joi.number().required(),
  contrast: Joi.number().required(),
  shift: Joi.number().required()
})
