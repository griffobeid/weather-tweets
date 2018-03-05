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
