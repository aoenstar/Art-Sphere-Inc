import prisma from '../prisma-client';
import { Project } from '@prisma/client';

const createProject = async (
  projectName: string,
  continent: string,
  description = '',
) => {
  const post: Project = await prisma.project.create({
    data: {
      name: projectName,
      continent,
      created_at: new Date(),
      description,
    },
  });
  return post;
};

const getProjectById = async (
  projectID: number
) => {
  const project = await prisma.project.findUnique({
    where: {
      project_id: projectID,
    },
  });
  return project;

};


export default { createProject, getProjectById };