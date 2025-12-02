import { Router } from 'express';
import { accessLegacy, addNominee, getNominees } from '../controllers/nomineeController';
import { protect } from '../middleware/authMiddleware';

const router = Router();

// Public Route (Access by Link)
router.get('/access/:id', accessLegacy);

// Protected Routes (Manage Nominees)
router.post('/', protect, addNominee);
router.get('/', protect, getNominees);

export default router;