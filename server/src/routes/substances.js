import { Router } from 'express';
import { substances, getSubstanceById } from '../db/substances.js';
import { protect } from '../middleware/auth.js';

const router = Router();

// GET /api/substances — search and filter substances
router.get('/', protect, (req, res) => {
  const { q, source, classification } = req.query;
  let results = [...substances];

  if (q) {
    const query = q.toLowerCase();
    results = results.filter(
      (s) =>
        s.name.toLowerCase().includes(query) ||
        s.commonName.toLowerCase().includes(query) ||
        s.chemicalFormula.toLowerCase().includes(query) ||
        s.casNumber.toLowerCase().includes(query) ||
        s.sources.drugbank.id.toLowerCase().includes(query) ||
        s.sources.pubchem.cid.toString().includes(query)
    );
  }

  if (classification) {
    results = results.filter((s) =>
      s.class.toLowerCase().includes(classification.toLowerCase())
    );
  }

  if (source === 'pubchem') {
    results = results.filter((s) => s.sources.pubchem?.cid);
  } else if (source === 'drugbank') {
    results = results.filter((s) => s.sources.drugbank?.id);
  } else if (source === 'tox21') {
    results = results.filter((s) => s.sources.tox21?.assayId);
  }

  res.json({
    total: results.length,
    substances: results,
    meta: {
      databases: ['PubChem (NIH)', 'DrugBank', 'Tox21 High-Throughput Screening'],
    },
  });
});

// GET /api/substances/:id — single substance details
router.get('/:id', protect, (req, res) => {
  const substance = getSubstanceById(req.params.id);
  if (!substance) {
    return res.status(404).json({ message: 'Substance not found in toxicology database' });
  }
  res.json({ substance });
});

export default router;
