import callApi from '../../util/apiCaller';

// Export Constants
export const ADD_TWEETS = 'ADD_TWEETS';

export function addTweets(tweets) {
  return {
    type: ADD_TWEETS,
    tweets,
  };
}

export function fetchTweets() {
  return (dispatch) => {
    return callApi('tweets').then(res => {
      dispatch(addTweets(res.tweets));
    }).catch(err => {
      throw err;
    });
  };
}
