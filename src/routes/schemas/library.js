const librariesByNameSchema = {
  name: {
    in: 'query',
    isString: true,
    optional: false,
    errorMessage: 'invalid_library_name',
  },
};
const librariesByIdSchema = {
  id: {
    in: 'params',
    isInt: true,
    errorMessage: 'invalid_library_id',
  },
};

export {
  librariesByNameSchema,
  librariesByIdSchema,
};
