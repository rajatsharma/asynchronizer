const path = require('path');

const entry = [path.resolve(__dirname, 'src', 'server.js')];
const output = {
  path: path.resolve(__dirname, 'dist'),
  filename: 'server.bundle.js',
};
const nodeEnv = 'NODE_ENV';

module.exports = { entry, output, nodeEnv };
