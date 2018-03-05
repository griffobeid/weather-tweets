import { ADD_TWEET, ADD_TWEETS } from './TweetActions';
// Initial State
const initialState = { data: [] };

const TweetReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TWEET :
      return {
        data: [action.tweet, ...state.data],
      };

    case ADD_TWEETS :
      return {
        data: action.tweets,
      };

    default:
      return state;
  }
};

/* Selectors */

// Get all tweets
export const getTweets = state => state.tweets.data;

// Export Reducer
export default TweetReducer;
