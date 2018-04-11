import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import GoogleMapReact from 'google-map-react';
import style from './mapStyle.json';

// Import Actions
import { fetchRecentTweets } from '../Tweet/TweetActions';

// Import Selectors
import { getTweets } from '../Tweet/TweetReducer';

class GoogleMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      center: {
        lat: 38.2,
        lng: -98,
      },
      zoom: 5,
      options: {
        styles: style,
      },
    };
  }

  componentDidMount() {
    this.props.dispatch(fetchRecentTweets());
  }

  render() {
    const { center, options, zoom } = this.state;
    console.log(this.props.tweets.length);
    return (
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: process.env.GOOGLE_MAP_API_KEY,
            libraries: 'visualization',
          }}
          defaultCenter={center}
          defaultZoom={zoom}
          options={options}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => {
            const heatmap = new maps.visualization.HeatmapLayer({
              data: this.props.tweets.map(tweet => ({
                location: new maps.LatLng(tweet.latitude, tweet.longitude),
              })),
              opacity: 0.7,
              radius: 15,
            });
            heatmap.setMap(map);
          }}
        />
      </div>
    );
  }
}

// Actions required to provide data for this component to render in sever side.
GoogleMap.need = [() => { return fetchRecentTweets(); }];

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    tweets: getTweets(state),
  };
}

GoogleMap.propTypes = {
  tweets: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(GoogleMap);
