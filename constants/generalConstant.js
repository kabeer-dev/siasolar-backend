const config = require('config');

module.exports = {
  tokenExpirationTime: '1d', // 1 day
  cookieExpirationTime: 24 * 60 * 60 * 1000, // 1 day in milliseconds
  passwordResetTokenExpiry: '1h', // 1 hour
  accountVerificationTokenExpiry: '1h', // 1 hour
  cors: {
    whitelist: [
      config.get('frontendURL'),
      ...process.env.ALLOWED_ORIGINS.split(','),
    ],
    errorMessage: 'Origin not allowed.',
  },
};
