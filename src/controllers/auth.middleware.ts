/**
 * All the middleware functions related to authentication
 */
import express from 'express';

/**
 * Middleware to check if a user is authenticated using any Passport Strategy
 * and creates an {@link ApiError} to pass on to error handlers if not
 */
const isAuthenticated = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  if (req.isAuthenticated()) {
    next(); // Go to the next non-error-handling middleware
    return;
  }
  // Providing a parameter means go to the next error handler
  res.status(400).json({error: 'Must be logged in.'});
};

// eslint-disable-next-line import/prefer-default-export
export { isAuthenticated };
