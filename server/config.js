const config = {
  mongoURL: process.env.MONGO_URL || 'mongodb://localhost:27017/weather-tweets',
  port: process.env.PORT || 8000,
  mapboxToken: process.env.MAPBOX_TOKEN,
  boundingBox: [
    [-124.9257514528, 23.6428469943],
    [-66.5614257446, 49.1686071266],
  ],
};

export default config;
