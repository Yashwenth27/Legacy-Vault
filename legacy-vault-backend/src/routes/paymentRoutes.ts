// src/routes/paymentRoutes.ts
import { Router } from 'express';
import { createOrder, verifyPayment } from '../controllers/paymentController';
import { protect } from '../middleware/authMiddleware';

const router = Router();

router.post('/order', protect, createOrder);
router.post('/verify', protect, verifyPayment); // <--- This is the one we need

export default router;