const {GeneralEntityFactory} = require('../factories/entities');

// const options = {fieldsInclusion: {omit: [], include: []}, populateFields};

module.exports.transformSchema = (_, doc, options = {}) => {
  const fieldsInclusion = options?.fieldsInclusion || {};

  const extraFieldsToOmit = fieldsInclusion?.omit || [];
  const omittedFieldsToInclude = fieldsInclusion?.include || [];

  try {
    return GeneralEntityFactory.cleanMongooseData({
      data: doc,
      extraFieldsToOmit,
      omittedFieldsToInclude,
    });
  } catch (error) {
    return doc;
  }
};

module.exports.transformData = ({doc, options}) => {
  const fieldsInclusion = options?.fieldsInclusion || {};

  if (fieldsInclusion?.omit?.length || fieldsInclusion?.include?.length) {
    if (Array.isArray(doc)) {
      return doc.map((doc) => doc.toObject(options));
    } else {
      return doc.toObject(options);
    }
  }
  return doc;
};
