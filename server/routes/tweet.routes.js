import { Router } from 'express';
import * as TweetController from '../controllers/tweet.controller';
const router = new Router();

// Get all Tweets
router.route('/tweets').get(TweetController.getTweets);

// Get one tweet by id
router.route('/tweets/:id').get(TweetController.getTweets);

export default router;
