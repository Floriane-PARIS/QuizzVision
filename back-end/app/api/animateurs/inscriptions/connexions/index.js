const { Router } = require('express')

const { Connexion } = require('../../../../models')

const { getInscriptionFromAnimateur } = require('../manager')
const { filterConnexionsFromInscription, getConnexionFromInscription } = require('./manager')

const router = new Router({ mergeParams: true })

router.get('/', (req, res) => {
  try {
    const inscription = getInscriptionFromAnimateur(req.params.animateurId, req.params.inscriptionId)
    const connexions = filterConnexionsFromInscription(inscription.id)
    res.status(200).json(connexions)
  } catch (err) {
    if (err.name === 'NotFoundError') {
      res.status(404).end()
    } else {
      res.status(500).json(err)
    }
  }
})

router.get('/:connexionId', (req, res) => {
  try {
    const connexion = getConnexionFromInscription(req.params.animateurId, req.params.inscriptionId, req.params.connexionId)
    res.status(200).json(connexion)
    console.log(connexion)
  } catch (err) {
    if (err.name === 'NotFoundError') {
      res.status(404).end()
    } else {
      res.status(500).json(err)
    }
  }
})


router.post('/', (req, res) => {
  try {
    const inscription = getInscriptionFromAnimateur(req.params.animateurId, req.params.inscriptionId)
    const connexion = Connexion.create({ ...req.body, inscriptionId: inscription.id })
    res.status(201).json(connexion)
  } catch (err) {
    if (err.name === 'NotFoundError') {
      res.status(404).end()
    } else if (err.name === 'ValidationError') {
      res.status(400).json(err.extra)
    } else {
      res.status(500).json(err)
    }
  }
})

router.put('/:connexionId', (req, res) => {
  try {
    const connexion = getConnexionFromInscription(req.params.animateurId, req.params.inscriptionId, req.params.connexionId)
    const updatedConnexion = Connexion.update(req.params.connexionId, { ...req.body, inscriptionId: connexion.inscriptionId })
    res.status(200).json(updatedConnexion)
  } catch (err) {
    if (err.name === 'NotFoundError') {
      res.status(404).end()
    } else if (err.name === 'ValidationError') {
      res.status(400).json(err.extra)
    } else {
      res.status(500).json(err)
    }
  }
})

router.delete('/:connexionId', (req, res) => {
  try {
    getConnexionFromInscription(req.params.animateurId, req.params.inscriptionId, req.params.connexionId)
    Connexion.delete(req.params.connexionId)
    res.status(204).end()
  } catch (err) {
    if (err.name === 'NotFoundError') {
      res.status(404).end()
    } else {
      res.status(500).json(err)
    }
  }
})

module.exports = router