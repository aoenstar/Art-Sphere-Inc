import express from 'express';
import { validationResult } from 'express-validator';
import { projectService } from '../services';
import { User } from '@prisma/client';
import { logHours, getHours, getTotalHours } from '../services/hours.service';

const logTimesheet = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const user = req.user as User;

  if (!user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { hours, date } = req.body;

  if (!hours || !date) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const hour = await logHours(user.user_id, hours, new Date(date));
  if (!hour) {
    return res.sendStatus(400);
  }
  return res.sendStatus(200);
};

const getTimesheet = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const user = req.user as User;

  if (!user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const hours = await getHours(user.user_id);

  return res.status(200).json(hours);
};

const getAllHours = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const user = req.user as User;

  if (!user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const totalHours = await getTotalHours(user.user_id);

  return res.status(200).send(totalHours.toString());
};

export { logTimesheet, getTimesheet, getAllHours };
