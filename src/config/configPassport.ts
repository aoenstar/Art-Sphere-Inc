import { Strategy as LocalStrategy, IVerifyOptions } from 'passport-local';
import * as passportStrat from 'passport';
import { compare } from 'bcrypt';
import {
  getUserById, getUserByEmail,
} from '../services/user.service';

interface IUserWithPassword {
  user_id: number;
  email: string;
  password?: string;
}

/**
 * Middleware to check if a user is authenticated using the Local Strategy.
 * @param email Email of the user
 * @param password Password of the user
 * @param done Callback function to return
 */
const verifyLocalUser = (
  email: string,
  password: string,
  done: (error: any, user?: any, options?: IVerifyOptions | undefined) => void,
): void => {
  // Match user with email
  const lowercaseEmail = email.toLowerCase();
  getUserByEmail(lowercaseEmail)
    .then((user: IUserWithPassword | null) => {
      if (!user) {
        return done(null, false, { message: 'User not found' });
      }
      // Match user with password
      return compare(password, user.password!, (err: any, isMatch: boolean) => {
        if (err) {
          return done(err);
        }
        if (isMatch) {
          const cleanUser = user;
          delete cleanUser.password;
          return done(null, cleanUser);
        }
        return done(null, false, { message: 'Incorrect password.' });
      });
    })
    .catch((error: any) => {
      return done(error);
    });
};

/**
 * Initializes all the configurations for passport regarding strategies.
 * @param passport The passport instance to use.
 */
const initializePassport = (passport: passportStrat.PassportStatic) => {
  // Set up middleware to use for each type of auth strategy
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email', // Treat email field in request as username
      },
      verifyLocalUser,
    ),
  );

  // Set up serialization and deserialization of user objects
  passport.serializeUser((user: any, done: any) => {
    done(null, user.user_id);
  });
  passport.deserializeUser((id: any, done: any) => {
    getUserById(id)
      .then((user: any) => done(null, user))
      .catch((err: any) => done(err, null));
  });
};

export default initializePassport;
