const { Theme } = require('../../models')

/**
 * Function buildTheme
 * @param themeId
 */
const buildTheme = (themeId) => {
    const theme = Theme.getById(themeId)
    return { ...theme}
}

/**
 * Function buildThemes.
 */
const buildThemes = () => {
    const themes = Theme.get()
    return themes.map((theme) => buildTheme(theme.id))
}

module.exports = {
    buildTheme,
    buildThemes,
}
