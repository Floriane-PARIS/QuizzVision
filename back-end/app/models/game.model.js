const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Game', {
  quizId: Joi.number().required(),
  questionId: Joi.number().required(),
  answers: Joi.array(),
})
