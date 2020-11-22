import httpStatus from 'http-status';
import Constants from '../../utils/constants';
import BusinessError from '../../utils/errors/business';
import UnauthorizedError from '../../utils/errors/unauthorized';
import LoggerManager from '../../utils/logger-manager';

export default function ErrorHandler(err, req, res) {
  if (err.errors && err.errors.length > 0) {
    res.status(httpStatus.BAD_REQUEST).json({
      error: err.errors.pop().msg,
    });
  } else if (err instanceof BusinessError) {
    res.status(httpStatus.BAD_REQUEST).json({
      error: err.code,
      ...err.options,
    });
  } else if (err instanceof UnauthorizedError) {
    res.sendStatus(httpStatus.UNAUTHORIZED);
  } else {
    LoggerManager.serverInternalErrorLogger(err);

    if (Constants.env !== 'production') {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ stack: err.stack, message: err.message, ...err });
    } else {
      res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
