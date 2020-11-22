import ExtendableError from './extendable-error';

export default class BusinessError extends ExtendableError {
  constructor(code, options) {
    super();
    this.code = code;
    this.options = options;
  }
}

export const ValidationCodeError = {
  INVALID_ID: 'invalid_id',
  INVALID_EMAIL: 'invalid_email',
  INVALID_PASSWORD: 'invalid_password',
  VALIDATION_NOT_FOUND: 'validation_not_found',
};

export const UserCodeError = {
  USER_NOT_FOUND: 'user_not_found',
  EMAIL_ALREADY_USED: 'email_already_used',
  INVALID_EMAIL_OR_PASSWORD: 'invalid_email_or_password',
};

export const CategoryCodeError = {
  CATEGORY_ALREADY_USED: 'category_already_used',
  CATEGORY_NOT_FOUND: 'category_not_found',

};

export const ProductCodeError = {
  PRODUCT_ALREADY_EXIST: 'product_already_exist',
  PRODUCT_NOT_FOUND: 'product_not_found',
};

export const ProductCategoryCodeError = {
  PRODUCT_CATEGORY_ALREADY_EXIST: 'product_category_already_exist',
  PRODUCT_CATEGORY_NOT_FOUND: 'product_category_not_found',
};

export const ProductColorCodeError = {
  PRODUCT_COLOR_ALREADY_EXIST: 'product_color_already_exist',
  PRODUCT_COLOR_NOT_FOUND: 'product_color_not_found',
};

export const ProductPhotoCodeError = {
  PHOTO_NOT_FOUND: 'photo_not_found',
};
