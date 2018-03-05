import React, { Component, PropTypes } from 'react';
import MapGL from 'react-map-gl';
import { defaultMapStyle } from './styles/map-style.js';
import TweetMarkers from '../Tweet/TweetContainer';

const TOKEN = 'pk.eyJ1IjoiZ29iZWlkIiwiYSI6ImNqY2plOTY3cjNjZGEzNG1tYTBhNDR4ODcifQ.Gk_662sQu4i6GmshCbCQ8Q';

class Mapbox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mapStyle: defaultMapStyle,
      viewport: {
        latitude: 40,
        longitude: -100,
        zoom: 3,
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

  render() {
    const { viewport, mapStyle } = this.state;

    return (
      <div>
        <MapGL
          {...viewport}
          mapStyle={mapStyle}
          onViewportChange={newView => this.setState({ viewport: newView })}
          mapboxApiAccessToken={TOKEN}
        >
          <TweetMarkers />
        </MapGL>
      </div>
    );
  }
}

Mapbox.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
};

export default Mapbox;
