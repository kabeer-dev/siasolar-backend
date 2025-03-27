const {userErrorsTypes} = require('../../constants/responses/errors/users');
const AppError = require('./AppError');

module.exports = class UsersErrorsFactory {
  static userAlreadyRegisteredErr() {
    return new AppError({
      message: 'user already registered',
      statusCode: 400,
      error: {type: userErrorsTypes.userAlreadyRegistered.value},
    });
  }

  static userNotFoundErr() {
    return new AppError({
      message: 'user not found',
      statusCode: 404,
      error: {type: userErrorsTypes.userNotFound.value},
    });
  }

  static wrongEmailOrPasswordErr() {
    return new AppError({
      message: 'wrong credentials',
      statusCode: 401,
      error: {type: userErrorsTypes.wrongEmailOrPassword.value},
    });
  }

  static loginResetTokenErr() {
    return new AppError({
      message:
        'Token is either expired or is invalid. Please create a new token and try again',
      statusCode: 400,
      error: {type: userErrorsTypes.invalidResetToken.value},
    });
  }

  static loginResetTokenUserErr() {
    return new AppError({
      message: 'Invited link is already used or the user is deleted',
      statusCode: 400,
      error: {type: userErrorsTypes.passwordResetFailed.value},
    });
  }

  static userNotVerifiedErr() {
    return new AppError({
      message: 'User Not Verified',
      statusCode: 403,
      error: {
        type: userErrorsTypes.userNotVerified.value,
      },
    });
  }

  static userAlreadyInvited() {
    return new AppError({
      message: 'user already invited',
      statusCode: 400,
      error: {type: userErrorsTypes.userAlreadyInvited.value},
    });
  }

  static employeeCodeAlreadyExist() {
    return new AppError({
      message: 'Employee code must be unique. This code is already in use.',
      statusCode: 400,
      error: {type: userErrorsTypes.employeeCodeAlreadyExist.value},
    });
  }
};
