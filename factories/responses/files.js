const AppResponse = require('./AppResponse');
const {filesSuccessTypes} = require('../../constants/responses/success/files');

module.exports = class FilesResponsesFactory {
  static fileUploadSuccessfully({url, key}) {
    return new AppResponse({
      message: 'File uploaded successfully',
      statusCode: 201,
      body: {
        file: url,
        path: key,
        type: filesSuccessTypes.fileUploadSuccessfully.value,
      },
    });
  }
};
