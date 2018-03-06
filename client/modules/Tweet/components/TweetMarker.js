import React, { PropTypes } from 'react';
import { Marker } from 'react-map-gl';


function TweetMarker(props) {
  return (
    <Marker longitude={props.lon} latitude={props.lat}>
      <div className="marker">
        "Im a Tweet"
      </div>
    </Marker>
  );
}

TweetMarker.propTypes = {
  lon: PropTypes.Number,
  lat: PropTypes.Number,
  createdAt: PropTypes.string.isRequired,
  id: PropTypes.Number,
  text: PropTypes.string.isRequired,
  profile_image_url: PropTypes.string.isRequired,
  screen_name: PropTypes.string.isRequired,
};

export default TweetMarker;
