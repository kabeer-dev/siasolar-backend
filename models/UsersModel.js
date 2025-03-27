const mongoose = require('mongoose');

const {jwtUtils, passwordsUtils} = require('../utils');
const {usersConstants, generalConstant} = require('../constants');
const {transformSchema} = require('../utils/mongoTransformUtils');
const {roles} = require('../constants/usersConstants');

const Schema = mongoose.Schema;

const levels = Object.values(usersConstants.ACCESS_LEVELS);

const permissionsSchema = {type: String, enum: levels, default: levels};

const userRoles = Object.keys(roles);

const usersSchema = new Schema(
  {
    firstName: {type: String, required: [true, 'User must have a first name']},
    lastName: {type: String, required: [true, 'User must have a last name']},
    email: {
      type: String,
      required: [true, 'User must have a email'],
      minlength: 4,
      maxlength: 255,
      unique: true,
    },
    password: {
      type: String,
      minlength: 6,
      maxlength: 2048,
    },
    isVerified: {type: Boolean, default: false},
    verificationToken: {type: String},
    loginResetToken: {type: String},
    employeeCode: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      url: String,
      path: String,
    },
    role: {
      type: String,
      required: true,
      enum: userRoles,
    },
    invitedBy: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Users',
    },
    token: {
      type: String,
      default: null,
    },
    isEvaluator: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
    toObject: {virtuals: true, transform: transformSchema},
    toJSON: {virtuals: true, transform: transformSchema},
    id: false,
  }
);

usersSchema.methods = {
  generateResetToken: function () {
    const payload = {email: this.email};
    const expiry = generalConstant.passwordResetTokenExpiry;
    const resetToken = jwtUtils.generateToken({payload, expiry});

    this.loginResetToken = resetToken;

    return resetToken;
  },
  generateVerificationToken: function () {
    const payload = {_id: this._id, email: this.email};
    const expiry = generalConstant.accountVerificationTokenExpiry;
    const verificationToken = jwtUtils.generateToken({payload, expiry});

    this.verificationToken = verificationToken;

    return verificationToken;
  },
};

module.exports = mongoose.model('Users', usersSchema);
