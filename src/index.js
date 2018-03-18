import Express from 'express';
import compression from 'compression';
import bodyParser from 'body-parser';

import routes from './routes';
import serverConfig from './config';
import responseFactory from './factories/response';

// Initialize the Express App
const app = new Express();

// Apply body Parser and server public assets and routes
app.use(compression());
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));
responseFactory(app).use(routes);

// start app
app.listen(serverConfig.port, (error) => {
  if (error) {
    console.log('Something Went Wrong');
    return;
  }
  console.log(`Server running at ${serverConfig.port}`);
});

export default app;
