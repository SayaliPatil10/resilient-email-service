import express from 'express';

import { sendEmailController } from '../controllers/email.controller.js'
import emailRateLimiter from "../middlewares/rateLimiter.js";

const router = express.Router();

router.post("/", emailRateLimiter, sendEmailController);

export default router;
