import express from 'express';
import { isAuthenticated } from '../controllers/auth.middleware';
import { getAllHours, getTimesheet, logTimesheet } from '../controllers/hours.controller';

const router = express.Router();

router.post('/', isAuthenticated, logTimesheet);
router.get('/', isAuthenticated, getTimesheet);
router.get('/total-hours', isAuthenticated, getAllHours);

export default router;
