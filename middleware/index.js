const authMiddleware = require(`./authMiddleware`);
const validatorMiddleware = require(`./validatorMiddleware`);
const errorMiddleware = require(`./errorMiddleware`);
const refreshTokenMiddleware = require('./refreshTokenMiddleware');
const finalResponseMiddleware = require('./finalResponseMiddleware');
const loggerMiddleware = require('./loggerMiddleware');
const accessMiddleware = require('./accessMiddleware');
const preparedObjectMiddleware = require('./preparedObjectMiddleware');
const { ddosProtectionMiddleware } = require('./dedosPreventionMiddleware');

module.exports = {
  authMiddleware,
  validatorMiddleware,
  errorMiddleware,
  refreshTokenMiddleware,
  finalResponseMiddleware,
  logger: loggerMiddleware, // logger.error() sounds more appropriate than loggerMiddleware.error() IMO.
  accessMiddleware,
  preparedObjectMiddleware,
  ddosProtectionMiddleware,
};
