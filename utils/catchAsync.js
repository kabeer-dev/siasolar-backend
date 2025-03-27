const {GeneralErrorsFactory} = require('../factories');
const logger = require('../middleware/loggerMiddleware');

module.exports = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (error) {
    logger.error(error);
    const data = {error};

    if (error.isKnown) {
      data.customMessage = error.message;
      data.statusCode = error.statusCode;
      data.type = error.internalErr?.type;
    }

    next(GeneralErrorsFactory.internalErr(data));
  }
};
