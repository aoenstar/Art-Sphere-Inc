import express from 'express';
import { validationResult } from 'express-validator';
import { projectService } from '../services';

const getAllProjects = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  return res.send('hi');
};

const createProject = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { projectName, continent, description } = req.body;
  const project = await projectService.createProject(
    projectName,
    continent,
    description,
  );

  res.send(project);
};

export { getAllProjects, createProject };
