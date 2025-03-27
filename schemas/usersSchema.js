const Yup = require('yup');

const {usersConstants} = require('../constants');
const {validatorUtils} = require('../utils');

const commonAuthSchema = {
  email: Yup.string()
    .email('Email must be valid')
    .required('Email is required')
    .test('email', 'Email is not valid', (value) => {
      // This custom regex test enhances email validation to address limitations in the default Yup validation, which fails to catch certain invalid email formats like "test@test" or "test@test.c".
      return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value);
    }),
  password: Yup.string()
    .required('Password is required')
    .min(
      8,
      'Must contain at least 8 characters and at least 1 uppercase letter'
    )
    .matches(
      /[A-Z]/,
      'Must contain at least 8 characters and at least 1 uppercase letter'
    ),
};

const commonNameSchema = {
  firstName: Yup.string()
    .min(1, 'First name must be at least 1 character')
    .max(255, 'First name cannot exceed more than 255 characters')
    .matches(/^[a-zA-Z\s]+$/, 'First name must contain only alphabets')
    .required('First name is required'),
  lastName: Yup.string()
    .min(1, 'Last name must be at least 1 character')
    .max(255, 'Last name cannot exceed more than 255 characters')
    .matches(/^[a-zA-Z\s]+$/, 'Last name must contain only alphabets')
    .required('Last name is required'),
};

module.exports.validateCreateRequest = (user) => {
  const schema = Yup.object().shape({
    ...commonAuthSchema,
    ...commonNameSchema,
    role: Yup.string().oneOf(Object.keys(usersConstants.roles)),
  });

  return validatorUtils.validate(schema, user);
};

module.exports.validateLoginRequest = (user) => {
  const schema = Yup.object().shape({
    email: commonAuthSchema.email,
    password: Yup.string().required('Password is required'),
  });

  return validatorUtils.validate(schema, user);
};

module.exports.validateEmail = (data) => {
  const schema = Yup.object().shape({email: commonAuthSchema.email});

  return validatorUtils.validate(schema, data);
};

module.exports.validateResetPasswordRequest = (data) => {
  const schema = Yup.object().shape({password: commonAuthSchema.password});

  return validatorUtils.validate(schema, data);
};
