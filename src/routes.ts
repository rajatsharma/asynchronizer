import { Router } from 'express';

const router = Router();

interface AsynchronizerResponse extends Response {
  create(response: any): AsynchronizerResponse;
  success(): AsynchronizerResponse;
  send(): void;
}

router.route('/').get(async (_req, res) => {
  const response = await Promise.resolve('Server Working Fine Again');
  (res as AsynchronizerResponse)
    .create(response)
    .success()
    .send();
});

export default router;
