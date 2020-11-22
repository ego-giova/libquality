import ExtendableError from './extendable-error';

export default class UnauthorizedError extends ExtendableError {
  constructor() {
    super('UnauthorizedError');
  }
}
