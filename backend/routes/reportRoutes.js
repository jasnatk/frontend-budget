import { Router } from 'express';
import auth from '../middleware/authMiddleware.js';
import { monthlyReport } from '../controllers/reportController.js';

const router = Router();

router.use(auth);
router.get('/:month', monthlyReport);

export default router;
