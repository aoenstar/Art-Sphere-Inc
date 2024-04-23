import express from 'express';
import { validationResult } from 'express-validator';
import { projectService } from '../services';
import { User } from '@prisma/client';

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

const getProjectsByUser = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { user_id } = req.params;
  const projects = await projectService.getProjectsByUser(parseInt(user_id));
  res.send(projects);
};

const assignUserToProject = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const user = req.user as User;

  if (!user) {
    return res.status(401).json({ error: 'Not logged in' });
  }
  const { project_id } = req.params;
  const assigned: boolean = await projectService.assignUserToProject(
    user.user_id,
    parseInt(project_id),
  );
  if (assigned) {
    return res.send({ assignmentStatus: 'success' });
  }
  return res.send({ assignmentStatus: 'fail' });
};

const inviteUser = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const user = req.user as User;

  if (!user) {
    return res.status(401).json({ error: 'Not logged in' });
  }
  const { project_id } = req.params;
  const { collaborators } = req.body;
  const assignmentStatus = await projectService.inviteUser(
    user.user_id,
    parseInt(project_id),
    collaborators,
  );
  return res.send(assignmentStatus);
};

const getProjectByContinent = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { continent } = req.params;
  const { userId } = req.query;
  const projects = await projectService.getProjectByContinent(
    continent,
    parseInt(userId as string),
  );
  res.send(projects);
};
export {
  getAllProjects,
  createProject,
  getProjectById,
  getProjectsByUser,
  assignUserToProject,
  inviteUser,
  getProjectByContinent,
};
