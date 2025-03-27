const Yup = require('yup');
const mongoose = require('mongoose');

module.exports.validate = async (schema, data) => {
  return await schema
    .validate(data, {abortEarly: false, stripUnknown: true})
    .then((parameters) => {
      return {parameters};
    })
    .catch((error) => {
      return {
        errors: error.errors.join(', '),
      };
    });
};

module.exports.mongooseIdValidate = (name, required = true) => {
  const schema = Yup.string().test({
    name: 'Id validation',
    message: `Invalid ${name} id`,
    test: (value) => (value ? mongoose.Types.ObjectId.isValid(value) : true),
  });

  if (required) schema.required(`${name} ID is required`);

  return schema;
};
