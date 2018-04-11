import callApi from '../../util/apiCaller';

// Export Constants
export const ADD_TWEETS = 'ADD_TWEETS';

export function addTweets(tweets) {
  return {
    type: ADD_TWEETS,
    tweets,
  };
}

export function fetchRecentTweets() {
  return (dispatch) => {
    return callApi('tweets/recent').then(res => {
      dispatch(addTweets(res.tweets));
    }).catch(err => {
      throw err;
    });
  };
}

export function fetchTweetsByDate(lowerBound, upperBound) {
  return (dispatch) => {
    return callApi(`tweets/${lowerBound}/${upperBound}`).then(res => {
      dispatch(addTweets(res.tweets));
    }).catch(err => {
      throw err;
    });
  };
}
