import Tweet from '../models/tweet';

/**
 * Get all tweets
 * @param req
 * @param res
 * @returns void
 */
export function getTweets(req, res) {
  Tweet.find().exec((err, tweets) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ tweets });
  });
}

/**
 * Get tweets from the last 3 hours
 * @param req
 * @param res
 * @returns void
 */
export function getRecentTweets(req, res) {
  const query = {
    dateAdded: {
      $gte: new Date(new Date().setHours(new Date().getHours() - 3)),
      $lt: new Date,
    },
  };
  Tweet.find(query).exec((err, tweets) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ tweets });
  });
}


/**
 * Get tweets from a date range
 * @param req
 * @param res
 * @returns void
 */
export function getTweetsByDate(req, res) {
  const query = {
    dateAdded: {
      $gte: req.params.lowerBound,
      $lt: req.params.upperBound,
    },
  };
  Tweet.find(query).exec((err, tweets) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ tweets });
  });
}

/**
 * Get the oldest tweet
 * @param req
 * @param res
 * @returns void
 */
export function getOldestTweet(req, res) {
  Tweet.find({}, {}, { limit: 1 }).sort({ dateAdded: 1 }).exec((err, tweet) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ tweet });
  });
}

/**
 * Get the newest tweet
 * @param req
 * @param res
 * @returns void
 */
export function getNewestTweet(req, res) {
  Tweet.find({}, {}, { limit: 1 }).sort({ dateAdded: -1 }).exec((err, tweet) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ tweet });
  });
}

/**
 * Get a single tweet by id
 * @param req
 * @param res
 * @returns void
 */
export function getTweet(req, res) {
  Tweet.findOne({ id: req.params.id }).exec((err, tweet) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ tweet });
  });
}
