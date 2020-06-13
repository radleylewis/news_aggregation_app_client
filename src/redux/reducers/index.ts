import { combineReducers } from 'redux';

import authenticationReducer from './authentication.reducer';

const rootReducer = combineReducers({
  authenticationReducer,
});

export default rootReducer;
