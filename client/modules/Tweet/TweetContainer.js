import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import TweetMarker from './components/TweetMarker';

// Import Actions and Reducers
import fetchTweets from './TweetActions';
import getTweets from './TweetReducer';

class TweetMarkers extends Component {
  componentDidMount() {
    this.props.dispatch(fetchTweets());
  }

  render() {
    console.log(this.props.tweets); // eslint-disable-line
    let tweetList = this.props.tweets.map((tweet, index) => {
      return (
        <TweetMarker
          key={index}
          coords={tweet.coords}
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
  tweets: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(TweetMarkers);
