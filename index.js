require('dotenv').config();

const config = require('config');

const app = require('./app');
const {mongoose} = require('./models'); // import connection

if (config.get('env') == config.get('envVariables.dev')) {
  const testOnDevelopment = async () => {};

  testOnDevelopment();
}
