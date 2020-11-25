import express from 'express';
import httpStatus from 'http-status';

import ErrorHandler from '../middlewares/error-handler';
import checkSchema from '../middlewares/check-schema';

import {
  librariesByIdSchema,
} from '../schemas/library';

import MetricsService from '../../services/business/metrics';

const routes = express.Router();

routes.post('/libraries/:id/collect',
  checkSchema(librariesByIdSchema),
  async (req, res) => {
    try {
      MetricsService.collectOpenIssuesMetricsById(req.params.id);
    } catch (err) {
      return ErrorHandler(err, req, res);
    }

    return res.status(httpStatus.OK).json({ response: { message: 'Started Collecting...' } });
  });

export default routes;
