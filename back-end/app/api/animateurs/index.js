const { Router } = require('express')

const { Animateur } = require('../../models')
const manageAllErrors = require('../../utils/routes/error-management')
const InscriptionsRouter = require('./inscriptions')
const { buildAnimateur, buildAnimateurs } = require('./manager')

const router = new Router()

router.use('/:animateurId/inscriptions', InscriptionsRouter)

router.get('/', (req, res) => {
  try {
    const animateurs = buildAnimateurs()
    res.status(200).json(animateurs)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.get('/:animateurId', (req, res) => {
  try {
    const animateur = buildAnimateur(req.params.animateurId)
    res.status(200).json(animateur)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.post('/', (req, res) => {
  try {
    const animateur = Animateur.create({ ...req.body })
    res.status(201).json(animateur)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.put('/:animateurId', (req, res) => {
  try {
    res.status(200).json(Animateur.update(req.params.animateurId, req.body))
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.delete('/:animateurId', (req, res) => {
  try {
    Animateur.delete(req.params.animateurId)
    res.status(204).end()
  } catch (err) {
    manageAllErrors(res, err)
  }
})

module.exports = router





























