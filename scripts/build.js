process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

const webpack = require('webpack');
const config = require('../config/webpack.config')({ env: 'production' });

module.exports = new Promise((resolve, reject) =>
  webpack(config, (err, stats) => {
    if (err) {
      console.log(err);
      reject(err);
      process.exit(1);
    }

    resolve(true);
    console.log(
      stats.toString({
        colors: true,
        chunks: false,
      }),
    );
  }),
);
