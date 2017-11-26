var fs = require('fs') //eslint-disable-line
var path = require('path')
var ExternalsPlugin = require('webpack-externals-plugin')

module.exports = {

  entry: path.resolve(__dirname, 'src/server.js'),

  output: {
    path: __dirname + '/dist/', // eslint-disable-line
    filename: 'server.bundle.js'
  },

  target: 'node',

  node: {
    __filename: true,
    __dirname: true
  },

  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      'node_modules'
    ]
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: [
            'es2015'
          ],
          plugins: [
            'transform-runtime',
            'transform-async-to-generator'
          ]
        }
      }, {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },
  plugins: [
    new ExternalsPlugin({
      type: 'commonjs',
      include: path.join(__dirname, './node_modules/')
    })
  ]
}
