export const deploySources = (sourceList) => ({
  type: 'DEPLOY_SOURCES',
  sourceList,
})

export const userLogin = (userData) => ({
  type: 'USER_LOGIN',
  userData,
})

export const selectedSources = (favourites) => ({
  type: 'RENDER_USER_SOURCES',
  favourites,
})

export const changePreferences = (newPreferences) => ({
  type: 'CHANGE_PREFERENCES',
  newPreferences,
})
