import Express from 'express';
import compression from 'compression';
import bodyParser from 'body-parser';
import Helmet from 'helmet';

import routes from './routes';
import responseFactory from './factories/response';

// Initialize the Express App
const app = Express();

// Apply body Parser and server public assets and routes
app
  .use(compression())
  .use(Helmet())
  .use(bodyParser.json({ limit: '20mb' }))
  .use(bodyParser.urlencoded({ limit: '20mb', extended: false }));

responseFactory(app).use(routes);

export default app;
