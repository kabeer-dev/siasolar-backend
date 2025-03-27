const express = require('express');
const {UsersController} = require('../controllers');
const {validatorMiddleware, authMiddleware} = require('../middleware');
const {catchAsync} = require('../utils');
const {usersSchema} = require('../schemas');

const {isRoleAllowed} = require('../middleware/checkRolesMiddleware');
const {roles} = require('../constants/usersConstants');

const router = express.Router();

router.post(
  '/login',
  validatorMiddleware(usersSchema.validateLoginRequest),
  catchAsync(UsersController.loginUser)
);

router.use(authMiddleware, isRoleAllowed({roles: [roles.admin.value]}));

module.exports = router;
