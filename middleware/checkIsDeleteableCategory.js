const {GeneralErrorsFactory} = require('../factories');
const ServicesModel = require('../models/servicesModel');
const {GeneralServices} = require('../services');

module.exports.checkIsDeleteableCategory = async (req, res, next) => {
  const categoryId = req.params._id;
  const {doc, error} = await GeneralServices.findOne({
    model: ServicesModel,
    query: {
      category: categoryId,
    },
  });

  if (error) {
    return next(GeneralErrorsFactory.badRequestErr());
  }

  if (doc) {
    return next(
      GeneralErrorsFactory.badRequestErr({
        customMessage: 'This category is attached with some service',
      })
    );
  }

  next();
};
