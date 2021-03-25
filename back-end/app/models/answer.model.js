const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Answer', {
  type: Joi.string(),
  value: Joi.string().required(),
  questionId: Joi.number(),
})
