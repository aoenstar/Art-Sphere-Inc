import express from 'express';
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
  if (req.body === undefined) {
    return res.status(400).send({ message: 'No request body' });
  }
  let description = '';
  if (req.body.description !== undefined) {
    description = req.body.description;
  }
  if (req.body.projectName === undefined) {
    return res.status(400).send({ message: 'No project name in request body' });
  }
  if (req.body.continent === undefined) {
    return res.status(400).send({ message: 'No continent in request body' });
  }
  const { projectName, continent } = req.body;
  console.log(description);
  const project = await projectService.createProject(
    projectName,
    continent,
    description,
  );

  res.send(project);
};
export { getAllProjects, createProject };
