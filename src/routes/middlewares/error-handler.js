import httpStatus from 'http-status';
import Constants from '../../utils/constants';
import BusinessError from '../../utils/errors/business';
import ExternalAPIError from '../../utils/errors/external-api';
import PersistenceError from '../../utils/errors/persistence';
import LoggerManager from '../../utils/logger-manager';

export default function ErrorHandler(err, req, res) {
  if (err.errors && err.errors.length > 0) {
    res.status(httpStatus.BAD_REQUEST).json({
      code: err.errors.pop().msg,
    });
  } else if (err instanceof BusinessError) {
    const status = (err.options && err.options.status) || httpStatus.BAD_REQUEST;

    res.status(status).json({
      code: err.code,
      // ...err.options,
    });
  } else if (err instanceof ExternalAPIError) {
    res.status(err.errResponse.status).json({
      code: err.code,
      message: err.errResponse.message,
    });
  } else if (err instanceof PersistenceError) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: err.message,
    });
  } else {
    LoggerManager.serverInternalErrorLogger(err);

    if (Constants.env !== 'production') {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message, ...err });
    } else {
      res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
