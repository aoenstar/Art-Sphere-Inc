import express from 'express';
import { body } from 'express-validator';

import {
  getQuestion,
  createQuestion,
  answerQuestion,
  deleteQuestion,
} from '../controllers/question.controller';

const router = express.Router();

router.post('/:questionId', answerQuestion);
router.post('/', createQuestion);
router.get('/:questionId', getQuestion);
router.delete('/:questionId', deleteQuestion);

export default router;
