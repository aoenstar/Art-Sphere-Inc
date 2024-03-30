import express from 'express';
import { body } from 'express-validator';

import {
  getAllProjects,
  createProject,
  getProjectById
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

router.get('/:projectID', getProjectById);

export default router;
