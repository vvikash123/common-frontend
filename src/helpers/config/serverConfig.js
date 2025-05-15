/* eslint-disable max-len */

if (process.env.BROWSER) {
  throw new Error(
    'Do not import `config.js` from inside the client-side code.',
  );
}

const log4jsConfig = {
  pm2: true,
  //pm2InstanceVar: 'INSTANCE_ID',
  appenders: {
    access: {
      type: 'dateFile',
      filename: process.env.LOG_FILE_ACCESS || 'log/access.log',
      pattern: '-yyyy-MM-dd',
      category: 'http',
    },
    app: {
      type: 'file',
      filename: process.env.LOG_FILE_APP || 'log/app.log',
      maxLogSize: 10485760,
      numBackups: 3,
    },
    errorFile: {
      type: 'file',
      filename: process.env.LOG_FILE_ERROR || 'log/errors.log',
    },
    errors: {
      type: 'logLevelFilter',
      level: 'ERROR',
      appender: 'errorFile',
    },
  },
  categories: {
    default: { appenders: ['app', 'errors'], level: 'DEBUG' },
    http: { appenders: ['access'], level: 'DEBUG' },
  },
};

module.exports = {
  // Node.js app
  port: process.env.PORT || 8031,

  log4jsConfig,

  // Web analytics
  analytics: {
    // https://analytics.google.com/
    googleTrackingId: 'UA-64032556-12', // UA-XXXXX-X,
  },
};
