import { Router } from 'express';

const router = Router();

router.route('/').get((_req, res) => {
  res.json({ hello: 'world' });
});

export default router;
