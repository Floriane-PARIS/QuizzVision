const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Game', {
  UserId: Joi.number().required(),
  QuizId: Joi.number().required(),
  Answers: Joi.array(),
})
