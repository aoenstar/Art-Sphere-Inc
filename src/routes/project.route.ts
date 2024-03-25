import express from 'express';

import {
  getAllProjects,
  createProject,
} from '../controllers/project.controller';

const router = express.Router();

router.get('/', getAllProjects);

router.post('/', createProject);

export default router;
