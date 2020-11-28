import express from 'express';
import httpStatus from 'http-status';

import ErrorHandler from '../middlewares/error-handler';
import checkSchema from '../middlewares/check-schema';

import {
  librariesByIdSchema,
} from '../schemas/library';

import {
  libraryStatisticsSchema,
} from '../schemas/metrics';

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

    return res.status(httpStatus.OK).json({ message: 'Started Collecting...' });
  });

routes.get('/libraries',
  checkSchema(libraryStatisticsSchema),
  async (req, res) => {
    let response = [];
    let { librariesId } = req.query;

    librariesId = librariesId.replace(/\s/g, '').split(',');
    librariesId = librariesId.map((libraryId) => Number(libraryId));

    try {
      response = await MetricsService.getLineChartStatistics(librariesId);
    } catch (err) {
      return ErrorHandler(err, req, res);
    }

    return res.status(httpStatus.OK).json(response);
  });

export default routes;
