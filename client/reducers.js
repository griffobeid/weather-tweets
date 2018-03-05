/**
 * Root Reducer
 */
import { combineReducers } from 'redux';

// Import Reducers
import app from './modules/App/AppReducer';
import tweets from './modules/Tweet/TweetReducer';

// Combine all reducers into one root reducer
export default combineReducers({
  app,
  tweets,
});
