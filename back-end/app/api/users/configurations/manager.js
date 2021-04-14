const { User, Configuration } = require('../../../models')
const NotFoundError = require('../../../utils/errors/not-found-error.js')

/**
 * Configurations Manager.
 * This file contains all the logic needed to by the configuration routes.
 */

/**
 *  filterConfigurationsFromUser.
 * This function filters among the configurations to return only the configuration linked with the given userId.
 * @param userId
 */
const filterConfigurationsFromUser = (userId) => {
  const configurations = Configuration.get()
  const parsedId = parseInt(userId, 10)
  return configurations.filter((configuration) => configuration.userId === parsedId)
}

/**
 * getConfigurationFromUser.
 * This function retrieves a configuration from a user. It will throw a not found exception if the userId in the configuration is different from the one provided in parameter.
 * @param userId
 * @param configurationId
 */
const getConfigurationFromUser = (userId, configurationId) => {
  // Check if quizId exists, if not it will throw a NotFoundError
  const user = User.getById(userId)
  const userIdInt = parseInt(userId, 10)
  const configuration = Configuration.getById(configurationId)
  if (configuration.userId !== userIdInt) throw new NotFoundError(`${configuration.handicap} id=${configurationId} was not found for ${user.lastName} id=${user.id} : not found`)
  return configuration
}

module.exports = {
  filterConfigurationsFromUser,
  getConfigurationFromUser,
}
