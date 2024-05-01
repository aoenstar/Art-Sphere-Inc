import express from 'express';
import { body } from 'express-validator';

import {
  getAllProjects,
  createProject,
  getProjectById,
  getProjectsByUser,
  assignUserToProject,
  inviteUser,
  getProjectByContinent,
  deleteProject,
} from '../controllers/project.controller';
import { isAuthenticated } from '../controllers/auth.middleware';

const router = express.Router();

router.post('/timesheet', isAuthenticated, getAllProjects);
router.get('/timesheet', isAuthenticated, getAllProjects);
router.get('/timesheet/total-hours', isAuthenticated, getAllProjects);

export default router;
