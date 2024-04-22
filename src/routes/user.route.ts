import express from 'express';

import {
  loginUser,
  registerUser,
  updatePassword,
  updateProfile,
} from '../controllers/user.controller';
import { isAuthenticated } from '../controllers/auth.middleware';

const router = express.Router();

router.post('/register',registerUser);
router.post('/login',loginUser);
router.put('/update-profile', isAuthenticated, updateProfile);
router.put('/update-password', isAuthenticated, updatePassword);

export default router;
