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




const answerQuestion = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { questionId } = req.params;
  const { answer } = req.body;
  
  try {
    const answeredQuestion = await projectService.question.update({
      where: { question_id: parseInt(questionId) },
      data: { answer },
    });
    res.status(200).json(answeredQuestion);
  } catch (error) {
    res.status(500).json({ error: 'Failed to answer question' });
  }
};

const getQuestion = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { questionId } = req.params;
  
  try {
    const question = await projectService.question.findUnique({
      where: { question_id: parseInt(questionId) },
    });
    if (!question) {
      res.status(404).json({ error: 'Question not found' });
    } else {
      res.status(200).json(question);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to get question' });
  }
};

const assignQuestion = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { questionId, userId } = req.params;
  
  try {
    const assignedQuestion = await projectService.question.update({
      where: { question_id: parseInt(questionId) },
      data: { assignedTo: { connect: { id: parseInt(userId) } } },
    });
    res.status(200).json(assignedQuestion);
  } catch (error) {
    res.status(500).json({ error: 'Failed to assign question' });
  }
};

const deleteQuestion = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { questionId } = req.params;
  
  try {
    await projectService.question.delete({
      where: { question_id: parseInt(questionId) },
    });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete question' });
  }
};

export { answerQuestion, getQuestion, assignQuestion, deleteQuestion };








export { getAllProjects, createProject };
