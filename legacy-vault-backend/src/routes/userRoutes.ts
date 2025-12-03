// src/routes/userRoutes.ts
import { Router } from 'express';
import { signup, login, getProfile, getRecoveryKit} from '../controllers/userController';
import { protect } from '../middleware/authMiddleware';

const router = Router();

// The endpoint will be /api/users/signup
router.post('/signup', signup);
router.post('/login', login);
router.get('/me', protect, getProfile);
router.get('/recovery-kit', protect, getRecoveryKit);

export default router;