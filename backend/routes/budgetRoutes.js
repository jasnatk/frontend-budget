import { Router } from 'express';
import auth from '../middleware/authMiddleware.js';
import { getBudgets, setBudget, updateBudget, deleteBudget } from '../controllers/budgetController.js';

const router = Router();

router.use(auth);
router.get('/:month', getBudgets);
router.post('/', setBudget);
router.put('/:id', updateBudget);
router.delete('/:id', deleteBudget);

export default router;
