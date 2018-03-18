import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import MapGL, { Marker } from 'react-map-gl';
import { defaultMapStyle } from './styles/map-style.js';
import TweetMarker from '../Tweet/TweetMarker';

// Import Actions
import { fetchTweets } from '../Tweet/TweetActions';

// Import Selectors
import { getTweets } from '../Tweet/TweetReducer';

class Mapbox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mapStyle: defaultMapStyle,
      viewport: {
        latitude: 37.785164,
        longitude: -100,
        zoom: 3.5,
        bearing: 0,
        pitch: 0,
        width: 500,
        height: 500,
      },
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this._resize);
    this._resize();
    this.props.dispatch(fetchTweets());
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._resize);
  }

  _resize = () => {
    this.setState({
      viewport: {
        ...this.state.viewport,
        width: this.props.width || window.innerWidth,
        height: this.props.height || window.innerHeight,
      },
    });
  };

  _updateViewport = (viewport) => {
    this.setState({ viewport });
  }

  _renderTweetMarker = (tweet, index) => {
    return (
      <Marker
        key={`marker-${index}`}
        longitude={tweet.longitude}
        latitude={tweet.latitude}
      >
        <TweetMarker />
      </Marker>
    );
  }

  render() {
    const { viewport, mapStyle } = this.state;

    return (
      <MapGL
        {...viewport}
        mapStyle={mapStyle}
        onViewportChange={this._updateViewport}
        mapboxApiAccessToken={this.props.token}
      >
        {this.props.tweets.map(this._renderTweetMarker)}
      </MapGL>
    );
  }
}

// Actions required to provide data for this component to render in sever side.
Mapbox.need = [() => { return fetchTweets(); }];

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    tweets: getTweets(state),
  };
}

Mapbox.propTypes = {
  tweets: PropTypes.array.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  token: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Mapbox);
