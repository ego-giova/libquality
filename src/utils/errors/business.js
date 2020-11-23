import ExtendableError from './extendable-error';

export default class BusinessError extends ExtendableError {
  constructor(code, options) {
    super();
    this.code = code;
    this.options = options;
  }
}

export const LibraryCodeError = {
  LIBRARIES_NOT_FOUND: 'libraries_not_found',
};
