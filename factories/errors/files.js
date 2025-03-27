const {filesErrorsTypes} = require('../../constants/responses/errors/file');
const AppError = require('./AppError');

module.exports = class FilesErrorsFactory {
  static fileNotUploaded() {
    return new AppError({
      message: 'Error while uploading file',
      statusCode: 400,
      error: {type: filesErrorsTypes.fileNotUploaded.value},
    });
  }

  static fileNotFound() {
    return new AppError({
      message: 'No file uploaded',
      statusCode: 400,
      error: {type: filesErrorsTypes.fileNotFound.value},
    });
  }
};
