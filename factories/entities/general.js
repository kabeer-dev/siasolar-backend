const omit = require('lodash/omit');

module.exports = class GeneralEntityFactory {
  static cleanMongooseData({
    data,
    extraFieldsToOmit = [],
    omittedFieldsToInclude = [],
  }) {
    let fieldsToOmit = [
      '__v',
      'password',
      'updatedAt',
      'createdAt',
      ...extraFieldsToOmit,
    ];

    fieldsToOmit = fieldsToOmit.filter(
      (field) => !omittedFieldsToInclude.includes(field)
    );
    const cleanObject = (obj) => ({
      ...omit(obj, fieldsToOmit),
    });

    return Array.isArray(data)
      ? data.map((item) => cleanObject(item))
      : cleanObject(data);
  }
};
