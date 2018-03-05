import callApi from '../../util/apiCaller';

// Export Constants
export const ADD_TWEET = 'ADD_TWEET';
export const ADD_TWEETS = 'ADD_TWEETS';


// Export Actions
export function addTweet(tweet) {
  return {
    type: ADD_TWEET,
    tweet,
  };
}

export function addTweetRequest(tweet) {
  return (dispatch) => {
    return callApi('tweets', 'tweet', {
      tweet: {
        coords: tweet.coords,
        coordType: tweet.coordType,
        createdAt: tweet.createdAt,
        id: tweet.id,
        text: tweet.text,
        name: tweet.name,
        location: tweet.location,
        profile_image_url: tweet.profile_image_url,
        screen_name: tweet.screen_name,
        dateAdded: tweet.dateAdded,
      },
    }).then(res => dispatch(addTweet(res.tweet)));
  };
}

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
    });
  };
}

export function fetchTweet(id) {
  return (dispatch) => {
    return callApi(`tweets/${id}`).then(res => dispatch(addTweet(res.tweets)));
  };
}
