import express from 'express';

import {
  loginUser,
  registerUser,
  updatePassword,
  updateProfile,
} from '../controllers/user.controller';

const router = express.Router();

router.post('/register',registerUser);
router.post('/login',loginUser);
router.put('/update-profile', updateProfile);
router.put('/update-password', updatePassword);

export default router;
