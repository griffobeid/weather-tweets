const config = {
  mongoURL: process.env.MONGO_URL || 'mongodb://localhost:27017/weather-tweets',
  port: process.env.PORT || 8000,
  mapboxToken: process.env.MAPBOX_TOKEN,
};

export default config;
