import React, { PropTypes, Component } from 'react';
import { Marker } from 'react-map-gl';


class TweetMarker extends Component {
  componentDidMount() {

  }

  render() {
    console.log(this.props); // eslint-disable-line
    return (
      <Marker longitude={50} latitude={60}>
        <div className="marker">
          {this.props.text}
        </div>
      </Marker>
    );
  }
}

TweetMarker.propTypes = {
  coords: PropTypes.arrayOf(Number).isRequired,
  createdAt: PropTypes.string.isRequired,
  id: PropTypes.Number,
  text: PropTypes.string.isRequired,
  profile_image_url: PropTypes.string.isRequired,
  screen_name: PropTypes.string.isRequired,
};

export default TweetMarker;
