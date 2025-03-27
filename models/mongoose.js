const {isMainThread} = require('worker_threads');
const mongoose = require('mongoose');
const config = require('config');
let conn;

if (isMainThread) {
  mongoose.Promise = global.Promise;
  mongoose.connect(config.get(`mongoUri`));
  conn = mongoose.connection;
  conn.on('error', () => console.log('connection error'));
  conn.on('open', () => console.log('Connected to MongoDB'));
}

module.exports = conn;
