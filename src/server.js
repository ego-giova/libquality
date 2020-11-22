import express from 'express';
import bodyParser from 'body-parser';
import compress from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import httpStatus from 'http-status';
import swaggerUi from 'swagger-ui-express';

import swaggerDocument from '../docs/libquality.json';

import routes from './routes/controllers/index';
import ErrorHandler from './routes/middlewares/error-handler';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

app.use(compress());

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

app.use('/docs', swaggerUi.serve);
app.use('/docs', swaggerUi.setup(swaggerDocument));

// mount all routes on /api path
app.use('/api', routes);

// catch 404 and forward to error handler
app.use((req, res) => {
  res.status(httpStatus.NOT_FOUND).json();
});

// Handle 500
// do not remove next from line bellow, error handle will not work
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  ErrorHandler(err, req, res);
});

export default app;
