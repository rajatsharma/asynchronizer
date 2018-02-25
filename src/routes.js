import { Router } from 'express';

const router = new Router();

router.route('/').get(async (req, res) => {
  const response = await Promise.resolve('Server Working Fine');
  res.json(response);
});

export default router;
