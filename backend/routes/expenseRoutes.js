import { Router } from 'express';
import auth from '../middleware/authMiddleware.js';
import { addExpense } from '../controllers/expenseController.js';

const router = Router();

router.use(auth);
router.post('/', addExpense);

export default router;
