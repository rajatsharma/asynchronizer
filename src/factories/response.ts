import { pick } from '@elementary/proper';

interface Transformer {
  mutate(mutation: Function): Transformer;
}
/*
  Change in this class can break the whole App,
  Handle with Care
*/

class Response implements Transformer {
  message: string;
  status: number;
  data: any;
  res: any;

  constructor(data: any, message: string, status: number) {
    this.message = message;
    this.status = status;
    this.data = data;
    this.res = null;
  }

  mutate(fn: Function) {
    return fn(this);
  }

  eligibleProperties = ['data', 'message', 'status', 'error'];

  captureOrignalResponse(res: any) {
    return this.mutate((self: any) => {
      self.res = res;
    });
  }

  send() {
    if (!this.res.json) {
      throw new Error('Cannot Call send Response before create');
    }
    this.res.json(pick(this.eligibleProperties, this));
  }

  success() {
    return this.mutate((self: any) => {
      self.status = 200;
      self.message = 'Success';
    });
  }

  forbidden(error: any) {
    return this.mutate((self: any) => {
      self.status = 403;
      self.message = 'Not Allowed';
      self.error = error;
      delete self.data;
    });
  }

  notfound(error: any) {
    return this.mutate((self: any) => {
      self.status = 404;
      self.message = 'Not Found';
      self.error = error;
      delete self.data;
    });
  }

  badrequest(error: any) {
    return this.mutate((self: any) => {
      self.status = 400;
      self.message = 'Bad Request';
      self.error = error;
      delete self.data;
    });
  }

  internalerror(error: any) {
    return this.mutate((self: any) => {
      self.status = 500;
      self.message = 'Internal Server Error';
      self.error = error;
      delete self.data;
    });
  }
}

const upgradeResponse = (app: any) =>
  app.use((_req: any, res: any, next: Function) => {
    res.create = (data: any) =>
      new Response(data, null, null).captureOrignalResponse(res);
    next();
  });

export default upgradeResponse;
