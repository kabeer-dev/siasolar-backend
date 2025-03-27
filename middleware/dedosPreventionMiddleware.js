const { rateLimit } = require('express-rate-limit');
const { GeneralErrorsFactory } = require('../factories');
const config = require('config');

module.exports.ddosProtectionMiddleware = rateLimit({
  windowMs: config.get('windowSizeInMinutes') * 60 * 1000,
  max: config.get('maxRequestsAllowed'),
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req, res) => {
    return req.method === 'OPTIONS' || req.url === '/favicon.ico';
  },
  handler: (req, res, next, options) => {
    next(GeneralErrorsFactory.tooManyRequestsErr());
  },
});
