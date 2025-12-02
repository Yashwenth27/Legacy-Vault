// src/routes/userRoutes.ts
import { Router } from 'express';
import { signup, login, getProfile} from '../controllers/userController';
import { protect } from '../middleware/authMiddleware';

const router = Router();

// The endpoint will be /api/users/signup
router.post('/signup', signup);
router.post('/login', login);
router.get('/me', protect, getProfile);

export default router;