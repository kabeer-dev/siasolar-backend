const {GeneralResponsesFactory, GeneralErrorsFactory} = require('../factories');
const {GeneralServices} = require('../services');

module.exports = class GeneralController {
  static create({model, key, data, options}) {
    return async (req, res, next) => {
      const {success, doc, error} = await GeneralServices.create({
        model,
        data,
        options,
      });
      if (doc) {
        next(GeneralResponsesFactory.dataSavedSuccessfully({data: doc, key}));
      }
      if (!success) throw error;
    };
  }

  static find({model, query, key, options}) {
    // Method for finding all documents without a login user
    return async (req, res, next) => {
      const {success, docs, error} = await GeneralServices.find({
        model,
        query,
        options,
      });
      if (!success) throw error;
      if (docs) {
        next(
          GeneralResponsesFactory.dataRetrievedSuccessfully({data: docs, key})
        );
      } else {
        next(GeneralErrorsFactory.notFoundErr());
      }
    };
  }

  static findAll({model, key, options}) {
    return async (req, res, next) => {
      const {success, docs, error} = await GeneralServices.findAll({
        model,
        options,
      });
      if (!success) throw error;
      if (docs) {
        next(
          GeneralResponsesFactory.dataRetrievedSuccessfully({data: docs, key})
        );
      } else {
        next(GeneralErrorsFactory.notFoundErr());
      }
    };
  }
  static findAllByUserId({model, _id, key, options}) {
    // Method for finding all documents with a login user
    return async (req, res, next) => {
      const {success, docs, error} = await GeneralServices.findAllByUserId({
        model,
        _id,
        options,
      });
      if (!success) throw error;
      if (docs) {
        next(
          GeneralResponsesFactory.dataRetrievedSuccessfully({data: docs, key})
        );
      } else {
        next(GeneralErrorsFactory.notFoundErr());
      }
    };
  }

  static updateById({model, _id, key, data, options}) {
    return async (req, res, next) => {
      const {success, doc, error} = await GeneralServices.updateById({
        model,
        _id,
        data,
        options,
      });
      if (!success) throw error;
      if (!doc) {
        next(GeneralErrorsFactory.notFoundErr());
      } else {
        next(GeneralResponsesFactory.dataUpdatedSuccessfully({data: doc, key}));
      }
    };
  }

  static delete({model, query, key, options}) {
    return async (req, res, next) => {
      const {success, doc, error} = await GeneralServices.delete({
        model,
        query,
        options,
      });
      if (!success) throw error;

      if (!doc) {
        next(GeneralErrorsFactory.notFoundErr());
      } else {
        next(GeneralResponsesFactory.dataDeletedSuccessfully({data: doc, key}));
      }
    };
  }

  static deleteById({model, _id, key, options}) {
    return async (req, res, next) => {
      const {success, doc, error} = await GeneralServices.deleteById({
        model,
        _id,
        options,
      });
      if (!success) throw error;

      if (!doc) {
        next(GeneralErrorsFactory.notFoundErr());
      } else {
        next(GeneralResponsesFactory.dataDeletedSuccessfully({data: doc, key}));
      }
    };
  }
};
