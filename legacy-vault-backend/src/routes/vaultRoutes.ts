// src/routes/vaultRoutes.ts
import { Router } from 'express';
import { addVaultItem, getVaultItems } from '../controllers/vaultController';
import { protect } from '../middleware/authMiddleware';

const router = Router();

// 1. Apply Security Guard (Middleware) to all routes here
// This ensures only logged-in users can access /api/vault
router.use(protect);

// 2. Define the Routes
router.post('/', addVaultItem); // To Save a Secret
router.get('/', getVaultItems); // To List Secrets

export default router;