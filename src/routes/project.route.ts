import express from 'express';
import { body } from 'express-validator';

import {
  getAllProjects,
  createProject,
} from '../controllers/project.controller';

const router = express.Router();

router.get('/', getAllProjects);

router.post(
  '/',
  body('projectName').notEmpty().withMessage('missing projectName').trim(),
  body('continent').notEmpty().withMessage('missing continent').trim(),
  body('description').default(''),
  createProject,
);

export default router;
