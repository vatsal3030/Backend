import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import {
  getChannelInfo,
  getChannelVideos,
  getChannelPlaylists,
  getChannelTweets
} from "../controllers/channel.controller.js";

const router = Router();

router.use(verifyJwt)

router.get("/:channelId", getChannelInfo);
router.get("/:channelId/videos", getChannelVideos);
router.get("/:channelId/playlists", getChannelPlaylists);
router.get("/:channelId/tweets", getChannelTweets);

export default router;
