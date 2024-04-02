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


// Endpoint 1: Answer a question
const answerQuestion = async (questionId: number, answer: string) => {
  try {
    const answeredQuestion = await prisma.question.update({
      where: { question_id: questionId },
      data: { answer },
    });
    return answeredQuestion;
  } catch (error) {
    throw new Error('Failed to answer question');
  }
};

// Endpoint 3: Get a specific question
const getQuestion = async (questionId: number) => {
  try {
    const question = await prisma.question.findUnique({
      where: { question_id: questionId },
    });
    if (!question) {
      throw new Error('Question not found');
    }
    return question;
  } catch (error) {
    throw new Error('Failed to get question');
  }
};

// Endpoint 4: Assign a question to a collaborator
const assignQuestion = async (
  questionId: number,
  userId: number,
) => {
  try {
    const assignedQuestion = await prisma.question.update({
      where: { question_id: questionId },
      data: { assignedTo: { connect: { id: userId } } },
    });
    return assignedQuestion;
  } catch (error) {
    throw new Error('Failed to assign question');
  }
};

// Endpoint 5: Delete a question
const deleteQuestion = async (questionId: number) => {
  try {
    await prisma.question.delete({
      where: { question_id: questionId },
    });
  } catch (error) {
    throw new Error('Failed to delete question');
  }
};






export default { createProject };
