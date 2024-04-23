import { access } from 'fs';
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

const getProjectById = async (projectID: number) => {
  const project = await prisma.project.findUnique({
    where: {
      project_id: projectID,
    },
  });
  return project;
};

const getProjectsByUser = async (user_id: number) => {
  const projects = await prisma.project.findMany({
    where: {
      owner_id: user_id,
    },
  });
  return projects;
};

const assignUserToProject = async (user_id: number, project_id: number) => {
  const project = await getProjectById(project_id);
  if (!project) {
    return false;
  }
  if (project.owner_id) {
    return false;
  }
  const updatedProject: Project = await prisma.project.update({
    where: {
      project_id: project_id,
    },
    data: {
      owner_id: user_id,
    },
  });
  await prisma.usersOnProjects.create({
    data: {
      user_id,
      project_id,
    },
  });
  return true;
};

const inviteUser = async (
  user_id: number,
  project_id: number,
  collaboratorEmails: string[],
) => {
  const project = await getProjectById(project_id);
  if (!project || project.owner_id != user_id) {
    return collaboratorEmails.reduce((acc, v) => ({ ...acc, v: false }), {});
  }

  const uniqueCollaboratorEmails = [...new Set(collaboratorEmails)];
  // Retrieve the user IDs based on the provided emails
  const collaborators = await prisma.user.findMany({
    where: {
      email: { in: uniqueCollaboratorEmails },
    },
    select: {
      user_id: true,
      email: true,
    },
  });

  // Extract the user IDs from the collaborators
  const collaboratorIds = collaborators.map(
    (collaborator) => collaborator.user_id,
  );

  const existingCollaborators = await prisma.usersOnProjects.findMany({
    where: {
      project_id,
      user_id: { in: collaboratorIds },
    },
    select: {
      user_id: true,
    },
  });

  const existingCollaboratorSet = new Set(
    existingCollaborators.map((x) => x.user_id),
  );

  const collaboratorMap = new Map<string, boolean>();
  collaborators.forEach((collaborator) => {
    const isAdded = !existingCollaboratorSet.has(collaborator.user_id);
    collaboratorMap.set(collaborator.email, isAdded);
  });

  const newCollaborators = collaboratorIds.filter(
    (uid) => !existingCollaboratorSet.has(uid),
  );
  const data = newCollaborators.map((uid) => ({
    user_id: uid,
    project_id,
  }));
  await prisma.usersOnProjects.createMany({ data });
  return Object.fromEntries(collaboratorMap);
};

export default {
  createProject,
  getProjectById,
  getProjectsByUser,
  assignUserToProject,
  inviteUser,
};
