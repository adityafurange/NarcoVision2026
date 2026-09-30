import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import authRoutes from './src/routes/auth.js';
import kitRoutes from './src/routes/kits.js';
import recordRoutes from './src/routes/testRecords.js';
import substanceRoutes from './src/routes/substances.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (_, res) => res.json({ status: 'ok', service: 'VishaTrace API', ts: new Date().toISOString() }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/kits', kitRoutes);
app.use('/api/records', recordRoutes);
app.use('/api/substances', substanceRoutes);

// 404
app.use((_, res) => res.status(404).json({ message: 'Route not found' }));

// Error handler
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`\n🚀 VishaTrace API running on http://localhost:${PORT}`);
  console.log(`   Health: http://localhost:${PORT}/health\n`);
});
