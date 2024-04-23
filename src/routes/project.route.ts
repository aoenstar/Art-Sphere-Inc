import express from 'express';
import { body } from 'express-validator';

import {
  getAllProjects,
  createProject,
  getProjectById,
  getProjectsByUser,
  assignUserToProject,
  inviteUser,
} from '../controllers/project.controller';
import { isAuthenticated } from '../controllers/auth.middleware';

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

router.get('/users/:user_id', getProjectsByUser);

router.post('/:project_id/assign-self', isAuthenticated, assignUserToProject);

router.post('/:project_id/invite', isAuthenticated, inviteUser);

export default router;
