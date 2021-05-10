const { Router } = require('express')

const { Connexion, Animateur, Inscription } = require('../../../models')
const manageAllErrors = require('../../../utils/routes/error-management')
const ConnexionsRouter = require('./connexions')
const { filterInscriptionsFromAnimateur, getInscriptionFromAnimateur } = require('./manager')

const router = new Router({ mergeParams: true })

router.get('/', (req, res) => {
  try {
    Animateur.getById(req.params.animateurId)
    res.status(200).json(filterInscriptionsFromAnimateur(req.params.animateurId))
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.get('/:inscriptionId', (req, res) => { 
  try {
    const inscription = getInscriptionFromAnimateur(req.params.animateurId, req.params.inscriptionId) 
    res.status(200).json(inscription)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.post('/', (req, res) => {
  try {
    Animateur.getById(req.params.animateurId)
    const animateurId = parseInt(req.params.animateurId, 10)
    let inscription = Inscription.create({ label: req.body.label, animateurId })
    if (req.body.connexions && req.body.animateurss.length > 0) {
      const connexions = req.body.connexions.map((connexion) => Connexion.create({ ...connexion, inscriptionId: inscription.id }))
      inscription = { ...inscription, connexions }
    }
    res.status(201).json(inscription)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.put('/:inscriptionId', (req, res) => {
  try {
    const inscription = getInscriptionFromAnimateur(req.params.animateurId, req.params.inscriptionId)
    const updatedInscription = Inscription.update(req.params.inscriptionId, { label: req.body.label, animateurId: inscription.animateurId })
    res.status(200).json(updatedInscription)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.delete('/:inscriptionId', (req, res) => {
  try {
    getInscriptionFromAnimateur(req.params.animateurId, req.params.inscriptionId)
    Inscription.delete(req.params.inscriptionId)
    res.status(204).end()
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.use('/:inscriptionId/connexions', ConnexionsRouter)

module.exports = router
