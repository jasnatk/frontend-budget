import { Router } from 'express';
import auth from '../middleware/authMiddleware.js';
import { getCategories, addCategory, updateCategory, deleteCategory } from '../controllers/categoryController.js';

const router = Router();

router.use(auth);
router.get('/', getCategories);
router.post('/', addCategory);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

export default router;
