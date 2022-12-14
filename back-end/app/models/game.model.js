const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Game', {
  quizId: Joi.number().required(),
  userId: Joi.number().required(),
  question: Joi.array(),
  answers: Joi.array(),
  score: Joi.number(),
  date: Joi.date(),
  configuration: Joi.array(),
})
