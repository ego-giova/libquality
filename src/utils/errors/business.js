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

export const MetricsCodeError = {
  LIBRARIES_STATISTICS_NOT_FOUND: 'not_found_statistics_for_requested_libraries',
};
