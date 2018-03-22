import Twitter from 'twitter';
import Tweet from './models/tweet';
import config from './config';

const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

const WORDS = 'atmosphere, barometer, blizzard, breeze, climate, cloudy, condensation, cumulus, dew point, disturbance, downburst, downdraft, drizzle, drought, flash flood, flood, flurry, fog, forecast, freeze, frost, funnel cloud, global warming, greenhouse effect, gust, hail, heat, humid, humidity, hurricane, hydrologic cycle, hydrosphere, ice, lake effect, lightning, meteorologist, meteorology, monsoon, overcast, ozone, permafrost, polar, precipitation, prevailing wind, radar, rain, rainbow, shower sky, sleet, smog, snow, snowfall, snowflake, snowstorm, storm, temperate, temperature, thermal, thunder, thunderstorm, warning, tstorm, t-storm, tornado, tornado warning, tropical, troposphere, turbulence, updraft, visibility, vortex, warm, weather, whiteout, wind, wind chill, wind chill factor'; // eslint-disable-line
const boundingBox = config.boundingBox;

const isTweetInBoundingBox = (tweet) => {
  const coords = tweet.coordinates.coordinates;
  const southWest = boundingBox[0];
  const northEast = boundingBox[1];
  // test longitude
  if (southWest[0] <= coords[0] && northEast[0] >= coords[0]) {
    // test latitude
    if (southWest[1] <= coords[1] && northEast[1] >= coords[1]) {
      return true;
    }
  }
  return false;
};

const isTweetGeotagged = (tweet) => {
  if (tweet.hasOwnProperty('retweeted_status')) {
    return false;
  }
  if (tweet.hasOwnProperty('coordinates') && tweet.coordinates !== null) {
    if (isTweetInBoundingBox(tweet)) {
      return true;
    }
  }
  return false;
};

const trimTweet = (tweet) => {
  const lon = tweet.coordinates.coordinates[0];
  const lat = tweet.coordinates.coordinates[1];
  const trimmed = {
    longitude: lon,
    latitude: lat,
    coordType: tweet.coordinates.type,
    createdAt: tweet.created_at,
    id: tweet.id,
    text: tweet.text,
    name: tweet.user.name,
    location: tweet.user.location,
    profileImageUrl: tweet.user.profile_image_url,
    screenName: tweet.user.screen_name,
  };
  return trimmed;
};

/**
 * Stream statuses filtered by keyword
 * number of tweets per second depends on topic popularity
 **/
client.stream('statuses/filter', { track: WORDS, locations: boundingBox.toString() },
  stream => {
    stream.on('data', data => {
      if (isTweetGeotagged(data)) {
        const trimmedTweet = trimTweet(data);
        const tweet = new Tweet({ ...trimmedTweet });

        Tweet.create([tweet], (error) => {
          if (!error) {
            // console.log('Inserted tweet. ', trimmedTweet.id);
          } else {
            throw error;
          }
        });
      }
    });

    stream.on('error', error => {
      throw error;
    });
  }
);

export default function () {
  Tweet.count().exec((err, count) => {
    if (count > 0) {
      return;
    }
  });
}
