const path = require('path');
const escape = require('escape-string-regexp');
const paths = require('./paths');

module.exports = () => ({
  watchOptions: {
    ignored: new RegExp(
      `^(?!${escape(
        path.normalize(`${paths.src}/`).replace(/[\\]+/g, '/'),
      )}).+/node_modules/`,
      'g',
    ),
  },
});
