import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import GoogleMapReact from 'google-map-react';
import style from './style.json';

// Import Actions
import { fetchTweets } from '../Tweet/TweetActions';

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
    this.props.dispatch(fetchTweets());
  }

  render() {
    const { center, options, zoom } = this.state;
    const points = this.props.tweets.map(tweet => { return { location: [tweet.latitude, tweet.longitude], weight: 1 }; });
    return (
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{
            libraries: 'visualization',
          }}
          defaultCenter={center}
          defaultZoom={zoom}
          options={options}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => {
            const heatmap = new maps.visualization.HeatmapLayer({
              data: points.map(point => ({
                location: new maps.LatLng(point.location[0], point.location[1]),
                weight: point.weight,
              })),
            });
            heatmap.setMap(map);
          }}
        />
      </div>
    );
  }
}

// Actions required to provide data for this component to render in sever side.
GoogleMap.need = [() => { return fetchTweets(); }];

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
