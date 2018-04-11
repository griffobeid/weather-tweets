# Weather Tweets
## System Requirements
```
MongoDB
Node
```

## Running the project
### Install Dependencies
`yarn` or `npm install`

### Setup an application on twitter

To begin setup an application on [twitter's developer portal](https://apps.twitter.com/). This requires a twitter account.

### Set environment variables

This project uses dotenv so create a file `.env` and add the following environment variables.
```
GOOGLE_MAP_API_KEY=<insert google maps api key>
TWITTER_CONSUMER_KEY=<insert twitter consumer key>
TWITTER_CONSUMER_SECRET=<insert twitter consumer secret>
TWITTER_ACCESS_TOKEN_KEY=<insert twitter access token key>
TWITTER_ACCESS_TOKEN_SECRET=<insert twitter access token secret>
```
### Run the project
`yarn start` or `npm start`