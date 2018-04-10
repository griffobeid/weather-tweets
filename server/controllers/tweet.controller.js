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
 * Get tweets from a date range
 * @param req
 * @param res
 * @returns void
 */
export function getTweetsByDate(req, res) {
  Tweet.find().exec((err, tweets) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ tweets });
  });
}

/**
 * Get a single tweet
 * @param req
 * @param res
 * @returns void
 */
export function getTweet(req, res) {
  console.log(req);
  Tweet.findOne({ id: req.params.id }).exec((err, tweet) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ tweet });
  });
}
