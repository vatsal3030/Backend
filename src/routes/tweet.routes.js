import { Router } from 'express';
import {
    createTweet,
    deleteTweet,
    getUserTweets,
    updateTweet,
    getTweetById,
    restoreTweet,
    getDeletedTweets
} from "../controllers/tweet.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyJwt);

// Create tweet
router.route("/").post(createTweet);

// Get tweets of a user
router.route("/user/:userId").get(getUserTweets);

// Get single tweet
router.route("/:tweetId").get(getTweetById);

// Update / delete tweet
router.route("/:tweetId")
    .patch(updateTweet)
    .delete(deleteTweet);

// Restore deleted tweet
router.route("/:tweetId/restore").patch(restoreTweet);

// Get deleted tweets (trash)
router.route("/trash/me").get(getDeletedTweets);

export default router;
