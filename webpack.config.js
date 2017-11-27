var path = require('path')
var nodeExternals = require('webpack-node-externals')

module.exports = {

  entry: ['@babel/polyfill', path.resolve(__dirname, 'src/server.js')],

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
            ['@babel/preset-env', {
              'targets': {
                'node': 'current'
              }
            }]
          ],
          plugins: [
            ['@babel/plugin-transform-regenerator', {
              'asyncGenerators': true,
              'generators': true,
              'async': true
            }]
          ]
        }
      }, {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },
  // https://stackoverflow.com/questions/33001237/webpack-not-excluding-node-modules
  // From your config file, it seems like you're only excluding node_modules from being parsed with babel-loader, but not from being bundled.
  // In order to exclude node_modules from build, https://github.com/kriasoft/react-starter-kit/issues/249
  externals: [nodeExternals()]
}
