/* eslint-disable import/prefer-default-export */
const libraryStatisticsSchema = {
  librariesId: {
    in: 'query',
    isString: true,
    optional: false,
    errorMessage: 'invalid_libraries_id',
  },
};

export {
  libraryStatisticsSchema,
};
