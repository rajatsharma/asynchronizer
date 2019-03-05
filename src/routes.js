import { Router } from 'express';

const router = Router();

router.route('/').get(async (_req, res) => {
  const response = await Promise.resolve('Server is running');
  res
    .create(response)
    .success()
    .send();
});

export default router;
