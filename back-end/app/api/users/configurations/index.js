const { Router } = require('express')

const { Configuration, User } = require('../../../models')
const manageAllErrors = require('../../../utils/routes/error-management')
const { filterConfigurationsFromUser, getConfigurationFromUser } = require('./manager')

const router = new Router({ mergeParams: true })

router.get('/', (req, res) => {
  try {
    User.getById(req.params.userId)
    res.status(200).json(filterConfigurationsFromUser(req.params.userId))
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.get('/:configurationId', (req, res) => {
  try {
    const configuration = getConfigurationFromUser(req.params.userId, req.params.configurationId)
    res.status(200).json(configuration)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.post('/', (req, res) => {
  try {
    User.getById(req.params.userId)
    const userId = parseInt(req.params.userId,10)
    let configuration = Configuration.create({ handicap: req.body.handicap, bold: req.body.bold, size: req.body.size, police: req.body.police, bright: req.body.bright, contrast: req.body.contrast, shift: req.body.shift, userId })
    res.status(201).json(configuration)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.put('/:configurationId', (req, res) => {
  try {
    const configuration = getConfigurationFromUser(req.params.userId, req.params.configurationId)
    const updatedConfiguration = Configuration.update(req.params.configurationId, { handicap: req.body.handicap, bold: req.body.bold, size: req.body.size, police: req.body.police, bright: req.body.bright, contrast: req.body.contrast, shift: req.body.shift, userId: configuration.userId })
    res.status(200).json(updatedConfiguration)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.delete('/:configurationId', (req, res) => {
  try {
    getConfigurationFromUser(req.params.userId, req.params.configurationId)
    Configuration.delete(req.params.configurationId)
    res.status(204).end()
  } catch (err) {
    manageAllErrors(res, err)
  }
})

module.exports = router
