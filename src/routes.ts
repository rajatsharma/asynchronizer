import { Router } from 'express';

const router = Router();

interface AsynchronizerResponse extends Response {
  create(response: any): AsynchronizerResponse;
  success(): AsynchronizerResponse;
  send(): void;
}

router.route('/').get(async (_req, res) => {
  const response = await Promise.resolve('Server is strongly typed');
  console.log(((res as unknown) as AsynchronizerResponse).create);
  ((res as unknown) as AsynchronizerResponse)
    .create(response)
    .success()
    .send();
});

export default router;
