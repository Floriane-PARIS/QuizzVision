const { Router } = require('express')
const QuizzesRouter = require('./quizzes')
const UserRouter = require('./users')
const GameRouter = require('./games')
const ThemeRouter = require('./themes')
const ConfigurationRouter = require('./users/configurations')
const GameQuestion = require('./quizzes/questions')


const router = new Router()
router.get('/status', (req, res) => res.status(200).json('ok'))
router.use('/quizzes', QuizzesRouter)
router.use('/users', UserRouter)
router.use('/games', GameRouter)
router.use('/themes', ThemeRouter)
router.use('/quizzes/questions', GameQuestion)
router.use('/users/configurations', ConfigurationRouter)

module.exports = router
