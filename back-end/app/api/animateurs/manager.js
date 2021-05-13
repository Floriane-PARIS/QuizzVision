const { Animateur } = require('../../models')
/*const { filterInscriptionsFromAnimateur } = require('./inscriptions/manager')
const { filterConnexionsFromInscription } = require('./inscriptions/connexions/manager')*/

/**
 * Function buildAnimateur.
 * This function aggregates the inscriptions and connexions from the database to build an animateur with all the data needed by the clients.
 * @param animateurId
 */
const buildAnimateur = (animateurId) => {
  const animateur = Animateur.getById(animateurId)
  /*const inscriptions = filterInscriptionsFromAnimateur(animateur.id)
  const inscriptionWithConnexions = inscriptions.map((inscription) => {
    const connexions = filterConnexionsFromInscription(inscription.id)
    return { ...inscription, connexions }
  })
  return { ...animateur, inscriptions: inscriptionWithConnexions }*/
  return { ...animateur}
}

/**
 * Function buildAnimateurs.
 * This function aggregates the inscriptions and connexions from the database to build entire animateurs.
 */
const buildAnimateurs = () => {
  const animateurs = Animateur.get()
  return animateurs.map((animateur) => buildAnimateur(animateur.id))
}

module.exports = {
  buildAnimateur,
  buildAnimateurs,
}
