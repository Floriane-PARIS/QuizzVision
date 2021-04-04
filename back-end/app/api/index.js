const { Router } = require('express')
const QuizzesRouter = require('./quizzes')
const UserRouter = require('./users')
const GameRouter = require('./games')
const ThemeRouter = require('./themes')
const ConfigurationRouter = require('./configurations')
//changes
const GameQuestion = require('./quizzes/questions')


const router = new Router()
router.get('/status', (req, res) => res.status(200).json('ok'))
router.use('/quizzes', QuizzesRouter)
router.use('/users', UserRouter)
router.use('/games', GameRouter)
router.use('/themes', ThemeRouter)
router.use('/configurations', ConfigurationRouter)
//changes
router.use('/quizzes/questions', GameQuestion)

module.exports = router
