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

export default { createProject };
