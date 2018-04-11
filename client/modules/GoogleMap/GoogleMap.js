import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import GoogleMapReact from 'google-map-react';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import dateFormat from '../../util/dateFormatter';
import style from './mapStyle.json';
import CPStyle from './ControlPanel.css';

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
      realTime: true,
      dateValue: 10,
      timeValue: [2, 5],
    };
  }

  componentDidMount() {
    this.props.dispatch(fetchRecentTweets());
  }

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  renderSliders(min, max) {
    const { dateValue, timeValue } = this.state;
    return (
      <div className={CPStyle['slider-container']}>
        <Slider
          min={min}
          max={max}
          defaultValue={dateValue}
          // onChange={event => { this.setState({ value: event.target.value }); }}
        />
        <Range
          min={0}
          max={24}
          defaultValue={timeValue}
        />
      </div>
    );
  }

  render() {
    const { center, options, realTime, zoom } = this.state;
    const { tweets } = this.props;
    console.log(tweets.length);
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
              data: tweets.map(tweet => ({
                location: new maps.LatLng(tweet.latitude, tweet.longitude),
              })),
              opacity: 0.7,
              radius: 15,
            });
            heatmap.setMap(map);
          }}
        />
        <div className={CPStyle['control-panel']}>
          <p className={CPStyle['cp-heading']}>Weather Tweets</p>
          <p className={CPStyle['cp-subheading']}>Time and Dates are in UTC</p>
          <form>
            <label>
              <input
                type="radio"
                value="real-time"
                name="control-panel"
                className={CPStyle['radio-button']}
                checked={realTime === true}
                onChange={() => { this.setState({ realTime: true }); }}
              />
              Real-Time (last 3 hours)
            </label>
            <br />
            <label>
              <input
                type="radio"
                value="date-range"
                name="control-panel"
                className={CPStyle['radio-button']}
                checked={realTime === false}
                onChange={() => { this.setState({ realTime: false }); }}
              />
              Select Time Range
            </label>
          </form>
          {realTime === false && this.renderSliders(5, 30)}
          {tweets.length > 0 &&
            <p className={CPStyle['date-range']}>
              {dateFormat(tweets[0].dateAdded)}
              <br /> to <br />
              {dateFormat(tweets[tweets.length - 1].dateAdded)}
            </p>}
          <p>Tweet count: {tweets.length}</p>
        </div>
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
