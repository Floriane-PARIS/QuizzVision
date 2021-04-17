const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Resultat', {
    userId: Joi.number(),
    handicap: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    note: Joi.number.required()
})