import { Router } from 'express';
import { testRecords } from '../db.js';
import { protect } from '../middleware/auth.js';

const router = Router();

// GET /api/records — list records (officer sees own, analyst sees all)
router.get('/', protect, (req, res) => {
  const records =
    req.user.role === 'analyst'
      ? testRecords
      : testRecords.filter((r) => r.officerId === req.user.id);
  res.json({ records });
});

// POST /api/records — create new test record
router.post('/', protect, async (req, res) => {
  try {
    const { kitId, caseNumber, location, notes, resultImageUrl, reactionTimeMs } = req.body;
    if (!kitId || !caseNumber)
      return res.status(400).json({ message: 'kitId and caseNumber are required' });
    const record = {
      id: `REC-${Date.now()}`,
      kitId,
      caseNumber,
      location: location || '',
      notes: notes || '',
      resultImageUrl: resultImageUrl || null,
      reactionTimeMs: reactionTimeMs || null,
      officerId: req.user.id,
      officerName: req.user.name,
      officerBadge: req.user.badge,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    testRecords.push(record);
    res.status(201).json({ record });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/records/:id — get single record
router.get('/:id', protect, (req, res) => {
  const record = testRecords.find((r) => r.id === req.params.id);
  if (!record) return res.status(404).json({ message: 'Record not found' });
  res.json({ record });
});

// PATCH /api/records/:id — update record (e.g. mark result)
router.patch('/:id', protect, (req, res) => {
  const idx = testRecords.findIndex((r) => r.id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: 'Record not found' });
  const allowed = ['notes', 'resultImageUrl', 'reactionTimeMs', 'status', 'result'];
  allowed.forEach((key) => {
    if (req.body[key] !== undefined) testRecords[idx][key] = req.body[key];
  });
  testRecords[idx].updatedAt = new Date().toISOString();
  res.json({ record: testRecords[idx] });
});

export default router;
