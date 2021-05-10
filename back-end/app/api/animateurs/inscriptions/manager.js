const { Animateur, Inscription } = require('../../../models')
const NotFoundError = require('../../../utils/errors/not-found-error.js')



/**
 * filterInscriptionsFromAnimateur.
 * This function filters among the inscriptions to return only the inscription linked with the given animateurId.
 * @param animateurId
 */
const filterInscriptionsFromAnimateur = (animateurId) => {
  const inscriptions = Inscription.get()
  const parsedId = parseInt(animateurId, 10)
  return inscriptions.filter((inscription) => inscription.animateurId === parsedId)
}

/**
 * getInscriptionFromAnimateur.
 * This function retrieves a inscription from a animateur. It will throw a not found exception if the animateurId in the inscription is different from the one provided in parameter.
 * @param animateurId
 * @param inscriptionId
 */
const getInscriptionFromAnimateur = (animateurId, inscriptionId) => {
  // Check if animateurId exists, if not it will throw a NotFoundError
  const animateur = Animateur.getById(animateurId)
  const animateurIdInt = parseInt(animateurId, 10)
  const inscription = Inscription.getById(inscriptionId)
  if (inscription.animateurId !== animateurIdInt) throw new NotFoundError(`${inscription.name} id=${inscriptionId} was not found for ${animateur.name} id=${animateur.id} : not found`)
  return inscription
}

module.exports = {
  filterInscriptionsFromAnimateur,
  getInscriptionFromAnimateur,
}
