import {
  checkSchema as realCheckSchema,
  validationResult,
} from 'express-validator';

/**
 *
 * @param {*} schema
 * @return {*} middleware array
 */
export default function checkSchema(schema) {
  return [
    realCheckSchema(schema),
    (req, res, next) => {
      try {
        validationResult(req).throw();
        next();
      } catch (err) {
        next(err);
      }
    },
  ];
}
