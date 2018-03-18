import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import MapGL, { Marker, Popup, NavigationControl } from 'react-map-gl';
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
        <TweetMarker onClick={() => this.setState({ popupInfo: tweet })} />
      </Marker>
    );
  }


  _renderPopup() {
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

    return (
      <MapGL
        {...viewport}
        mapStyle={mapStyle}
        onViewportChange={this._updateViewport}
        mapboxApiAccessToken={this.props.token}
      >

        {this.props.tweets.map(this._renderTweetMarker)}

        {this._renderPopup()}

        <div className="nav" style={navStyle}>
          <NavigationControl onViewportChange={this._updateViewport} />
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