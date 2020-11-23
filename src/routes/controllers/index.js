import express from 'express';

const router = express.Router();
const startedAt = Date.now();

router.get('/status', async (req, res) => res.json({
  uptime: Date.now() - startedAt,
}));

router.use('/libraries', require('./library').default);

export default router;
