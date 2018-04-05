import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import MapGL, { Marker, Popup, NavigationControl } from 'react-map-gl';
// import HeatmapOverlay from 'react-map-gl-heatmap-overlay';
import { defaultMapStyle } from './styles/map-style.js';
import TweetMarker from '../Tweet/TweetMarker';
import TweetInfo from '../Tweet/TweetInfo';

// Import Actions
import { fetchTweets } from '../Tweet/TweetActions';

// Import Selectors
import { getTweets } from '../Tweet/TweetReducer';

const navStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  padding: '10px',
};

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
      popupInfo: null,
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.resize);
    this.resize();
    this.props.dispatch(fetchTweets());
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  resize = () => {
    this.setState({
      viewport: {
        ...this.state.viewport,
        width: this.props.width || window.innerWidth,
        height: this.props.height || window.innerHeight,
      },
    });
  };

  updateViewport = (viewport) => {
    this.setState({ viewport });
  }

  renderTweetMarker = (tweet, index) => {
    return (
      <Marker
        key={`marker-${index}`}
        longitude={tweet.longitude}
        latitude={tweet.latitude}
      >
        <TweetMarker onClick={() => this.setState({ popupInfo: tweet })} />
      </Marker>
    );
  }

  renderPopup() {
    const { popupInfo } = this.state;

    return popupInfo && (
      <Popup
        tipSize={5}
        anchor="top"
        longitude={popupInfo.longitude}
        latitude={popupInfo.latitude}
        onClose={() => this.setState({ popupInfo: null })}
      >
        <TweetInfo info={popupInfo} />
      </Popup>
    );
  }

  render() {
    const { viewport, mapStyle } = this.state;
    const { token, tweets } = this.props;
    // const TWEETS = tweets.map(tweet => { return { longitude: tweet.longitude, latitude: tweet.latitude }; });

    return (
      <MapGL
        {...viewport}
        mapStyle={mapStyle}
        onViewportChange={this.updateViewport}
        mapboxApiAccessToken={token}
      >

        {/* {tweets.map(this.renderTweetMarker)}

        {this.renderPopup()} */}

        {/* <HeatmapOverlay locations={TWEETS} {...viewport} /> */}

        <div className="nav" style={navStyle}>
          <NavigationControl onViewportChange={this.updateViewport} />
        </div>

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
