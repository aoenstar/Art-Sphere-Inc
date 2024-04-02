import express from 'express';
import { body } from 'express-validator';

import {
  getQuestion,
  answerQuestion,
  deleteQuestion,
} from '../controllers/question.controller';

const router = express.Router();

router.post('/:questionId', answerQuestion);
router.get('/:questionId', getQuestion);
router.delete('/:questionId', deleteQuestion);

export default router;
