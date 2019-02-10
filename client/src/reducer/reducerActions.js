export const deploySources = (sourceList) => ({
	type: 'DEPLOY_SOURCES',
	sourceList,
});

export const userLogout = () => ({
	type: 'LOG_OUT',
});

export const userLogin = (userData) => ({
	type: 'USER_LOGIN',
	userData,
});

export const selectedSources = (favourites) => ({
	type: 'RENDER_USER_SOURCES',
	favourites,
});

export const changePreferences = (newPreferences) => ({
	type: 'CHANGE_PREFERENCES',
	newPreferences,
});

export const bookmark = (check) => ({
	type: 'BOOKMARK',
	check,
});
