const initialState = {
  loggedIn: false,
  stories: [],
  username: '',
  userEmail: '',
  userFirstname: '',
  userSurname: '',
  userPreferences: [],
  newsSources: [],
}

const reducer = (state=initialState, action) => {
  switch(action.type) {
    case 'DEPLOY_SOURCES':
      return {...state, newsSources: action.sourceList};
    case 'DEPLOY_STORIES':
      return {...state, stories: action.storyList};
    case 'RENDER_USER_SOURCES':
      return {...state, userPreferences: action.favourites};
    case 'USER_LOGIN':
      return {...state,
        loggedIn: true,
        username: action.userData.username,
        userEmail: action.userData.email,
        userFirstname: action.userData.firstname,
        userSurname: action.userData.surname,
        userPreferences: action.userData.preferences,
        stories: action.userData.stories,
      }
    default:
      return state;
  }
}

export default reducer;
