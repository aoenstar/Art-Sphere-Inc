import express from 'express';
import { validationResult } from 'express-validator';
import { createUser, updateUser } from '../services/user.service';
import passport from 'passport';
import { User } from '@prisma/client';

const registerUser = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const {
    firstname,
    lastname,
    email,
    password,
    institution,
    age_group,
    zipcode,
    gender,
  } = req.body;

  if (!firstname || !lastname || !email || !password || !institution) {
    res.status(400).json({
      error:
        'Missing required fields: firstname, lastname, email, password, institution',
    });
    return;
  }

  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/g;

  const passwordRegex = /^[a-zA-Z0-9!?$%^*)(+=._-]{6,61}$/;

  const nameRegex = /^[a-z ,.'-]+/i;

  if (
    !email.match(emailRegex) ||
    !password.match(passwordRegex) ||
    !firstname.match(nameRegex) ||
    !lastname.match(nameRegex)
  ) {
    res
      .status(400)
      .json({ error: 'Invalid email, password, firstname, or lastname' });
    return;
  }

  if (req.isAuthenticated()) {
    res.status(400).json({ error: 'Already logged in' });
    return;
  }

  const user = await createUser({
    firstname,
    lastname,
    email,
    password,
    institution,
    age_group,
    zipcode,
    gender,
  });

  if (!user) {
    res.status(500).json({ error: 'Failed to create user' });
  }

  const userWithoutPassword = {
    ...user,
  };

  delete userWithoutPassword.password;

  res.send(userWithoutPassword);
};

const loginUser = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  if (req.isAuthenticated()) {
    res.status(400).json({ error: 'Already logged in' });
    return;
  }

  return passport.authenticate(
    ['local'],
    {
      failureMessage: true,
    },
    // Callback function defined by passport strategy in configPassport.ts
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (err: any, user: any, info: any) => {
      if (err) {
        res.status(500).json({
          error: 'Failed to authenticate user',
        });
        return;
      }
      if (!user) {
        res.status(401).json({
          error: 'Incorrect credentials',
        });
        return;
      }
      req.logIn(user, (error) => {
        if (error) {
          console.log(error);
          res.status(500).json({
            error: 'Failed to log in user',
          });
          return;
        }
        res.status(200).send(user);
      });
    },
  )(req, res, next);
};

const updatePassword = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ error: 'Missing required fields: password' });
  }

  const user = req.user as User;

  if (!user) {
    return res.status(401).json({ error: 'Not logged in' });
  }

  const profileUpdate = await updateUser({
    user_id: user.user_id,
    password,
  });

  res.send(profileUpdate);
};

const updateProfile = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, institution, firstname, lastname } = req.body;

  const user = req.user as User;

  if (!user) {
    return res.status(401).json({ error: 'Not logged in' });
  }

  const profileUpdate = await updateUser({
    user_id: user.user_id,
    email,
    institution,
    firstname,
    lastname,
  });

  res.send(profileUpdate);
};

export { registerUser, loginUser, updateProfile, updatePassword };
