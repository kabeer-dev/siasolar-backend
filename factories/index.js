const ErrorsFactory = require('./errors');
const ResponsesFactory = require('./responses');
const MongosFactory = require('./MongoFactories');

module.exports = {
  ...ErrorsFactory,
  ...ResponsesFactory,
  MongosFactory,
};
