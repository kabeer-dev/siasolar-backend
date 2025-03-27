const AuthErrors = require('../factories/errors/AuthErrors');

module.exports.isRoleAllowed =
  ({roles}) =>
  (req, res, next) => {
    if (roles.includes(req.jwtToken.user.role)) {
      return next();
    } else {
      return next(AuthErrors.unauthorized());
    }
  };
