import { Router } from 'express';
import { kits, getKitById } from '../db.js';
import { protect } from '../middleware/auth.js';

const router = Router();

// GET /api/kits — list all kits
router.get('/', protect, (req, res) => {
  res.json({ kits });
});

// GET /api/kits/:id — get kit by ID (used after QR scan)
router.get('/:id', protect, (req, res) => {
  const kit = getKitById(req.params.id);
  if (!kit) return res.status(404).json({ message: 'Kit not found' });
  res.json({ kit });
});

export default router;
