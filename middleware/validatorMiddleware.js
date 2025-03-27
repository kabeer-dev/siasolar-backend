const {GeneralErrorsFactory} = require('../factories');

module.exports = (validateFunction, reqProperty) => async (req, res, next) => {
  try {
    const source = req[reqProperty];
    const {errors, parameters} = await validateFunction(source || req.body);
    if (errors)
      return next(GeneralErrorsFactory.badRequestErr({customMessage: errors}));

    // Setting the cleaned parameters to the request (all the fields that were not mentioned in the schema have been removed)
    req[reqProperty || 'body'] = parameters;

    next();
  } catch (error) {
    res.status(500).send(error);
  }
};
