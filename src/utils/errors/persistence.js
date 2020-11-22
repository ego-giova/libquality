import ExtendableError from './extendable-error';
import LoggerManager from '../logger-manager';
import Constants from '../constants';

export default class PersistenceError extends ExtendableError {
  constructor(err) {
    super();
    // Errors log
    // LoggerManager.sendNewRelic(err);

    if (Constants.env !== 'production') {
      LoggerManager.databaseErrorLogger(err);
    }
  }
}
