var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'realtime'
    },
    port: 3000,
    db: 'mongodb://localhost/realtime-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'realtime'
    },
    port: 3000,
    db: 'mongodb://localhost/realtime-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'realtime'
    },
    port: 3000,
    db: 'mongodb://localhost/realtime-production'
  }
};

module.exports = config[env];
