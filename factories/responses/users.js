const config = require('config');

const AppResponse = require('./AppResponse');
const {userSuccessTypes} = require('../../constants/responses/success/users');

module.exports = class UsersResponsesFactory {
  constructor() {}

  static userRegisteredSuccessfully({user, isLoginRequest}) {
    return new AppResponse({
      message: 'User registered successfully',
      statusCode: 201,
      body: {
        type: userSuccessTypes.userRegisteredSuccessfully.value,
        isLoginRequest,
        user,
      },
    });
  }

  static userLoggedInSuccessfully({user, isLoginRequest}) {
    return new AppResponse({
      message: 'User logged in successfully',
      statusCode: 200,
      body: {
        user,
        isLoginRequest,
        type: userSuccessTypes.userLoggedInSuccessfully.value,
      },
    });
  }

  static singleUserInfoRetrievedRes({user} = {}) {
    return new AppResponse({
      message: 'User info retrieved successfully',
      statusCode: 200,
      body: {user, type: userSuccessTypes.UserInfoRetrievedRes.value},
    });
  }

  static resetPasswordLinkGeneratedSuccessfully({resetToken, resetUrl}) {
    return new AppResponse({
      message: 'Reset password link sent successfully',
      statusCode: 200,
      body: {
        resetToken,
        resetUrl,
        type: userSuccessTypes.resetPasswordLinkGeneratedSuccessfully.value,
      },
    });
  }

  static passwordResetSuccessfully() {
    return new AppResponse({
      statusCode: 200,
      message: 'Password reset successfully',
      body: {type: userSuccessTypes.passwordResetSuccessfully.value},
    });
  }

  static logoutSuccessfully() {
    return new AppResponse({
      statusCode: 200,
      message: 'Logout successfully',
      body: {type: userSuccessTypes.logoutSuccessfully.value},
    });
  }

  static userInvitedSuccessfully({user}) {
    return new AppResponse({
      statusCode: 200,
      message: 'User invited successfully',
      body: {user, type: userSuccessTypes.userInvitedSuccessfully.value},
    });
  }
};
