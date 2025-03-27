const {transformData} = require('../utils/mongoTransformUtils');
const {asyncTryCatch} = require('../utils/tryCatchUtils');
function cleanDataWithOptions({success, response, options = {}}) {
  const fieldsInclusion = options?.fieldsInclusion || {};

  if (
    success &&
    response &&
    (fieldsInclusion?.omit?.length || fieldsInclusion?.include?.length)
  ) {
    return transformData({doc: response, options});
  }
  return response;
}

module.exports.create = async ({model, data, session = null, options = {}}) => {
  let savedData = null;

  const {success, error, response} = await asyncTryCatch(async () => {
    if (Array.isArray(data)) {
      return await model.create(data, {session});
    } else {
      const doc = new model(data);
      return await doc.save({session});
    }
  });

  savedData = cleanDataWithOptions({success, response, options});
  return {success, doc: savedData, error};
};

module.exports.updateOne = async ({
  model,
  query = {},
  data,
  session = null,
  options = {},
}) => {
  const updateArgs = {new: true, session};
  const popOpts = options?.populateFields;

  let updatedDoc = null;

  const {success, error, response} = await asyncTryCatch(
    async () =>
      await model
        .findOneAndUpdate(query, data, updateArgs)
        .populate(popOpts || '')
  );

  updatedDoc = cleanDataWithOptions({success, response, options});
  return {success, doc: updatedDoc, error};
};

module.exports.updateMany = async ({
  model,
  query = {},
  data,
  session = null,
}) => {
  const updateArgs = {new: true, session};

  const {success, error, response} = await asyncTryCatch(
    async () => await model.updateMany(query, data, updateArgs)
  );

  return {success, error, response};
};

module.exports.updateById = async ({
  model,
  _id,
  data,
  session = null,
  options = {},
}) => {
  return await this.updateOne({
    model,
    query: {_id},
    data,
    session,
    options,
  });
};

module.exports.findOne = async ({model, query = {}, options = {}}) => {
  let doc = null;
  const popOpts = options?.populateFields;

  const {success, error, response} = await asyncTryCatch(
    async () => await model.findOne(query).populate(popOpts || '')
  );

  doc = cleanDataWithOptions({success, response, options});
  return {success, doc, error};
};

module.exports.find = async ({model, query = {}, options = {}, sort}) => {
  let docs = null;
  const popOpts = options?.populateFields;

  const {success, error, response} = await asyncTryCatch(
    async () =>
      await model
        .find(query)
        .populate(popOpts || '')
        .sort(sort || {})
  );

  docs = cleanDataWithOptions({success, response, options});
  return {success, docs, error};
};

module.exports.findAll = async ({model, options = {}, sort = {}}) =>
  await this.find({
    model,
    query: {},
    options,
    sort,
  });

module.exports.findById = async ({model, _id, options = {}}) =>
  await this.findOne({
    model,
    query: {_id},
    options,
  });

module.exports.delete = async ({model, query = {}, options = {}, session}) => {
  let deletedDoc = null;
  const {success, error, response} = await asyncTryCatch(
    async () => await model.findOneAndDelete(query, {session})
  );

  deletedDoc = cleanDataWithOptions({success, response, options});
  return {success, doc: deletedDoc, error};
};

module.exports.deleteById = async ({model, _id, options = {}, session}) =>
  await this.delete({
    model,
    query: {_id},
    options,
    session,
  });

module.exports.deleteMany = async ({model, query = {}, options = {}}) => {
  const {success, error, response} = await asyncTryCatch(
    async () => await model.deleteMany(query)
  );

  return {success, error, response};
};
