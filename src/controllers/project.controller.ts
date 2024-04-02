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

const getProjectById = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { projectID } = req.params;
  try {
    const project = await projectService.getProjectById(Number(projectID));
    if (!project) {
      return res.status(400).json({ message: 'Project not found' });
    }
    res.status(200).send(project);
  } catch (error) {
    next(error);
  }
};

export { getAllProjects, createProject, getProjectById };