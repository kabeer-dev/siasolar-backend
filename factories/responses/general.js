const {
  generalSuccessTypes,
} = require('../../constants/responses/success/general');
const {userSuccessTypes} = require('../../constants/responses/success/users');
const AppResponse = require('./AppResponse');

module.exports = class GeneralResponsesFactory {
  static successResponse({message, statusCode = 200, data, key, type}) {
    return new AppResponse({
      message: message,
      statusCode: statusCode,
      body: {[key]: data, type},
    });
  }

  static dataSavedSuccessfully({data, key}) {
    return this.successResponse({
      message: 'Data saved successfully',
      statusCode: 201,
      data,
      key,
      type: generalSuccessTypes.dataSavedSuccessfully.value,
    });
  }

  static dataRetrievedSuccessfully({data, key}) {
    return this.successResponse({
      message: 'Data retrieved successfully',
      statusCode: 200,
      data,
      key,
      type: generalSuccessTypes.dataRetrievedSuccessfully.value,
    });
  }

  static dataUpdatedSuccessfully({data, key}) {
    return this.successResponse({
      message: 'Data updated successfully',
      statusCode: 200,
      data,
      key,
      type: generalSuccessTypes.dataUpdatedSuccessfully.value,
    });
  }

  static dataDeletedSuccessfully({data, key}) {
    return this.successResponse({
      message: 'Data deleted successfully',
      statusCode: 200,
      data,
      key,
      type: generalSuccessTypes.dataDeletedSuccessfully.value,
    });
  }

  static dataUpdateSuccessfully({data, key}) {
    return this.successResponse({
      message: 'Data update successfully',
      statusCode: 200,
      data,
      key,
      type: userSuccessTypes.userUpdateSuccessfully.value,
    });
  }
};
