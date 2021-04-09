const { Router } = require('express')

const { Configuration } = require('../../models')
const manageAllErrors = require('../../utils/routes/error-management')


const router = new Router({ mergeParams: true })

const router = new Router()

router.get('/', (req, res) => {
  try {
    res.status(200).json(Configuration.get())
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.get('/:configurationId', (req, res) => {
  try {
    res.status(200).json(Configuration.getById(req.params.configurationId))
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.post('/', (req, res) => {
  try {
    const configuration = Configuration.create({ ...req.body })
    res.status(201).json(configuration)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.put('/:configurationId', (req, res) => {
  try {
    res.status(200).json(Configuration.update(req.params.configurationId, req.body))
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.delete('/:configurationId', (req, res) => {
  try {
    Configuration.delete(req.params.configurationId)
    res.status(204).end()
  } catch (err) {
    manageAllErrors(res, err)
  }
})

module.exports = router
