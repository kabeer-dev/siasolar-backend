const {generalErrorTypes} = require('../../constants/responses/errors/general');
const AppError = require('./AppError');

module.exports = class GeneralErrorsFactory {
  static invalidTokenErr({customMessage} = {}) {
    return new AppError({
      message: customMessage || 'invalid token',
      error: {type: generalErrorTypes.invalidToken.value},
      statusCode: 400,
    });
  }

  static badRequestErr({customMessage} = {}) {
    return new AppError({
      message: customMessage || 'bad request',
      error: {type: generalErrorTypes.badRequest.value},
      statusCode: 400,
    });
  }
  static notFoundErr({customMessage} = {}) {
    return new AppError({
      message: customMessage || 'not found',
      error: {type: generalErrorTypes.notFound.value},
      statusCode: 404,
    });
  }

  static internalErr({customMessage, statusCode, type} = {}) {
    return new AppError({
      message: customMessage || 'Something went wrong',
      statusCode: statusCode || 500,
      error: {type: type || generalErrorTypes.internalError.value},
    });
  }

  static missingObjectId() {
    return new AppError({
      message: 'ID missing. Please provide and id',
      error: {type: generalErrorTypes.missingObjectId.value},
      statusCode: 400,
    });
  }

  static invalidObjectId() {
    return new AppError({
      message: 'ID invalid. Please provide a valid ID',
      error: {type: generalErrorTypes.invalidObjectId.value},
      statusCode: 400,
    });
  }

  static tooManyRequestsErr() {
    return new AppError({
      message: 'Too many requests. You are temporarily blocked.',
      error: {type: generalErrorTypes.temporarilyBlocked.value},
      statusCode: 500,
    });
  }
};
