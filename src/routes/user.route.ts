import express from 'express';
import { body } from 'express-validator';

import {
  registerUser,
} from '../controllers/user.controller';



const router = express.Router();

router.post(
  '/',
  body('firstname').notEmpty().withMessage('missing projectName').trim(),
  body('lastname').notEmpty().withMessage('missing continent').trim(),
  body('institution').default(''),
  registerUser,
);

export default router;
