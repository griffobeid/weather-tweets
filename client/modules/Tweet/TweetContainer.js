import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import TweetMarker from './components/TweetMarker';

// Import Actions
import { fetchTweets } from './TweetActions';

// Import Selectors
import { getTweets } from './TweetReducer';

class TweetMarkers extends Component {
  componentDidMount() {
    this.props.dispatch(fetchTweets());
  }

  render() {
    let tweetList = this.props.tweets.map((tweet, index) => {
      return (
        <TweetMarker
          key={index}
          lon={tweet.longitude}
          lat={tweet.latitude}
          createdAt={tweet.createdAt}
          id={tweet.id}
          text={tweet.text}
          profile_image_url={tweet.profile_image_url}
          screen_name={tweet.screen_name}
        />
      );
    });
    return (
      <div className="markers">
        {tweetList}
      </div>
    );
  }
}

// Actions required to provide data for this component to render in sever side.
TweetMarkers.need = [() => { return fetchTweets(); }];

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    tweets: getTweets(state),
  };
}

TweetMarkers.propTypes = {
  tweets: PropTypes.Array,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(TweetMarkers);
