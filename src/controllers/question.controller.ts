import express from 'express';
import { projectService, questionService } from '../services';

const answerQuestion = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { questionId } = req.params;
  const { answer } = req.body;
  try {
    await questionService.answerQuestion(parseInt(questionId), answer);
    res.status(200).end();
  } catch (e) {
    res.status(400).end();
  }
};

const createQuestion = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,

) => {
  const {question, project_id} = req.body;
  const createdQuestion = await questionService.createQuestion(question, project_id);
  res.send(createdQuestion);
}

const getQuestion = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { questionId } = req.params;

  let question = null;
  try {
    question = await questionService.getQuestion(parseInt(questionId));
    if (!question) {
      res.status(404).json({ error: 'Question not found' });
    } else {
      res.status(200).json(question);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to get question' });
  }
};

const deleteQuestion = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { questionId } = req.params;

  try {
    await questionService.deleteQuestion(parseInt(questionId));
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete question' });
  }
};

export { answerQuestion, createQuestion, getQuestion, deleteQuestion };
