import express from 'express';
import httpStatus from 'http-status';

import ErrorHandler from '../middlewares/error-handler';
import checkSchema from '../middlewares/check-schema';

import { getGithubFilters } from '../filters/library';
import {
  librariesByNameSchema,
  librariesByIdSchema,
} from '../schemas/library';

import LibraryService from '../../services/business/library';

const routes = express.Router();

routes.get('/',
  checkSchema(librariesByNameSchema),
  async (req, res) => {
    let response = null;
    const filters = {
      ...getGithubFilters(req),
    };

    try {
      response = await LibraryService.getGithubLibraries(filters);
    } catch (err) {
      return ErrorHandler(err, req, res);
    }

    return res.status(httpStatus.OK).json(response);
  });

routes.get('/:id',
  checkSchema(librariesByIdSchema),
  async (req, res) => {
    let response = null;

    try {
      response = await LibraryService.getGithubLibraryById(req.params.id);
    } catch (err) {
      return ErrorHandler(err, req, res);
    }

    return res.status(httpStatus.OK).json(response);
  });

export default routes;
