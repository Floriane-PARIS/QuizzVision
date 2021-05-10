const { Connexion, Inscription } = require('../../../../models')
const NotFoundError = require('../../../../utils/errors/not-found-error.js')
const { getInscriptionFromAnimateur } = require('../manager')

/**
 * filterConnexionsFromInscription.
 * This function filters among the inscriptions to return only the inscription linked with the given animateurId.
 * @param inscriptionId
 */
const filterConnexionsFromInscription = (inscriptionId) => Inscription.get().filter((inscription) => (inscription.connexionId === connexionId))

/**
 * getConnexionFromInscription.
 * This function retrieves a connexion from an inscription. It will throw a not found exception if the inscriptionId in the connexion is different from the one provided in parameter.
 * @param animateurId
 * @param inscriptionId
 * @param questionId
 */
const getConnexionFromInscription = (animateurId, inscriptionId, connexionId) => {
  const inscription = getInscriptionFromAnimateur(animateurId, inscriptionId)
  const connexion = Connexion.getById(connexionId)
  if (connexion.inscriptionId !== inscription.id) throw new NotFoundError(`${connexion.name} id=${connexionId} was not found for ${inscription.name} id=${inscription.id} : not found`)
  return connexion
}

module.exports = {
  getConnexionFromInscription,
  filterConnexionsFromInscription,
}