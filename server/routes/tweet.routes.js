import { Router } from 'express';
import * as TweetController from '../controllers/tweet.controller';

const router = new Router();

// Get all Tweets
router.route('/tweets').get(TweetController.getTweets);

// Get tweets from the last 3 hours
router.route('/tweets/recent').get(TweetController.getRecentTweets);

// Get one tweet by id
router.route('/tweets/:id').get(TweetController.getTweet);

// Get tweets from a range of time
router.route('/tweets/:lowerBound/:upperBound').get(TweetController.getTweetsByDate);

// Get the oldest tweet
router.route('/oldest').get(TweetController.getOldestTweet);

// Get the newest tweet
router.route('/newest').get(TweetController.getNewestTweet);

export default router;
