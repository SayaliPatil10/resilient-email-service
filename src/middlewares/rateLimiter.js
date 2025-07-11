import rateLimit from "express-rate-limit";

const emailRateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 5, // max 5 requests
  message: {
    status: 429,
    message: "Too many email requests. Please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export default emailRateLimiter;
