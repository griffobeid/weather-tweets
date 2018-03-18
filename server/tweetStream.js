import Tweet from './models/tweet';
const Twitter = require('twitter');

const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

const WORDS = 'atmosphere, barometer, blizzard, breeze, climate, cloudy, condensation, cumulus, cyclone, dew point, disturbance, downburst, downdraft, drizzle, drought, eye wall, flash flood, flood, flurry, fog, forecast, freeze, frost, Fujita scale, funnel cloud, global warming, greenhouse effect, gust, hail, heat, humid, humidity, hurricane, hydrologic cycle, hydrosphere, ice, lake effect, lightning, meteorologist, meteorology, monsoon, overcast, ozone, permafrost, polar, precipitation, prevailing wind, radar, rain, rainbow, rain gauge, rain shadow, shower sky, sleet, smog, snow, snowfall, snowflake, snowstorm, storm, temperate, temperature, thermal, thermometer, thunder, thunderstorm, thunderstorm, warning, tstorm, t-storm, tornado, tornado warning, tropical, troposphere, trough, turbulence, typhoon, updraft, vapour, visibility, vortex, warm, water cycle, weather, weather vane, whiteout, wind, wind chill, wind chill factor'; // eslint-disable-line

const isTweetGeotagged = (tweet) => {
  if (tweet.hasOwnProperty('retweeted_status')) {
    return false;
  }
  if (tweet.hasOwnProperty('coordinates')) {
    if (tweet.coordinates !== null) {
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
client.stream('statuses/filter', { track: WORDS },
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
