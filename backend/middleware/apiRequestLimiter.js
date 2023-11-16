import rateLimit from "express-rate-limit";

export const contactRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes in milliseconds
  limit: 3,
  message: {
    message: "Too many contact requests. Please try again after 15 minutes.", // sends message in json format
  },
  statusCode: 429,
  legacyHeaders: true,
});

export const loginRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes in milliseconds
  limit: 5,
  message: {
    message: "Too many login requests. Please try again after 15 minutes.", // sends message in json format
  },
  statusCode: 429,
  legacyHeaders: true,
});

export const registerRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes in milliseconds
  limit: 5,
  message: {
    message: "Too many register requests. Please try again after 15 minutes.", // sends message in json format
  },
  statusCode: 429,
  legacyHeaders: true,
});

export const forgotPasswordRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes in milliseconds
  limit: 5,
  message: {
    message:
      "Too many forgot password requests. Please try again after 15 minutes.", // sends message in json format
  },
  statusCode: 429,
  legacyHeaders: true,
});
