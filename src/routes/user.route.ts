import express from 'express';

import {
  loginUser,
  registerUser,
  updatePassword,
  updateProfile,
  logout
} from '../controllers/user.controller';
import { isAuthenticated } from '../controllers/auth.middleware';

const router = express.Router();

router.post('/register',registerUser);
router.post('/login',loginUser);
router.post('/logout', isAuthenticated, logout);
router.put('/update-profile', isAuthenticated, updateProfile);
router.put('/update-password', isAuthenticated, updatePassword);

export default router;
