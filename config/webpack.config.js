const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const OverrideConfigWebpackPlugin = require('@enginite/override-config-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const config = require('./paths');
const { getClientEnv } = require('./env');

// This is the Webpack configuration.
// It is focused on developer experience and fast rebuilds.
module.exports = options => {
  const babelRcPath =
    path.resolve('.babelrc') || path.resolve('babel.config.js');
  const hasBabelRc = fs.existsSync(babelRcPath);
  const mainBabelOptions = {
    babelrc: true,
    cacheDirectory: true,
    presets: [],
  };

  const clearConsole = true;
  const host = '0.0.0.0';
  const port = 8000;

  const dotenv = getClientEnv({ clearConsole, host, port });

  if (hasBabelRc) {
    console.log('> Using .babelrc defined in your app root');
  } else {
    mainBabelOptions.presets.push(
      require.resolve('@lectro/babel-preset-lectro'),
    );
  }

  return {
    // Webpack can target multiple environments such as `node`,
    // `browser`, and even `electron`. Since Lectro is focused on Node,
    // we set the default target accordingly.
    target: 'node',
    mode: process.env.NODE_ENV,
    // The benefit of Webpack over just using babel-cli or babel-node
    // command is sourcemap support. Although it slows down compilation,
    // it makes debugging dramatically easier.
    devtool: process.env.NODE_ENV === 'production' ? 'none' : 'eval',
    // Webpack allows you to define externals - modules that should not be
    // bundled. When bundling with Webpack for the backend - you usually
    // don't want to bundle its node_modules dependencies. This creates an externals
    // function that ignores node_modules when bundling in Webpack.
    // @see https://github.com/liady/webpack-node-externals
    externals: nodeExternals({
      whitelist: [
        /\.(eot|woff|woff2|ttf|otf)$/,
        /\.(svg|png|jpg|jpeg|gif|ico|webm)$/,
        /\.(mp4|mp3|ogg|swf|webp)$/,
        /\.(css|scss|sass|less|styl)$/,
      ],
    }),
    // As of Webpack 2 beta, Webpack provides performance hints.
    // Since we are not targeting a browser, bundle size is not relevant.
    // Additionally, the performance hints clutter up our nice error messages.
    performance: {
      hints: false,
    },
    // Since we are wrapping our own webpack config, we need to properly resolve
    // Lectro's and the given user's node_modules without conflict.
    resolve: {
      extensions: ['.ts', '.js', '.json'],
      modules: [
        config.userNodeModulesPath,
        path.resolve(__dirname, '../../node_modules'),
      ],
    },
    resolveLoader: {
      modules: [
        config.userNodeModulesPath,
        path.resolve(__dirname, '../../node_modules'),
      ],
    },
    node: {
      __filename: true,
      __dirname: true,
    },
    entry: options.entry || {
      main: [`${config.src}/index.js`],
    },
    // This sets the default output file path, name, and compile target
    // module type. Since we are focused on Node.js, the libraryTarget
    // is set to CommonJS2
    output: {
      path: config.build,
      filename: '[name].js',
      sourceMapFilename: '[name].map',
      libraryTarget: 'commonjs2',
    },
    // Define a few default Webpack loaders. Notice the use of the new
    // Webpack 2 configuration: module.rules instead of module.loaders
    module: {
      rules: [
        {
          test: /\.purs$/,
          loader: require.resolve('purs-loader'),
          exclude: /node_modules/,
          query: {
            psc: 'psa',
            src: [config.pursFiles, config.pscPackages],
            pscPackage: true,
            bundle: options.env !== 'development',
            watch: options.env === 'development',
          },
        },
        // This is the development configuration.
        // It is focused on developer experience and fast rebuilds.
        {
          test: /\.json$/,
          loader: 'json-loader',
        },
        // Process JS with Babel (transpiles ES6 code into ES5 code).
        {
          test: /\.(ts|tsx|js|jsx)$/,
          loader: 'babel-loader',
          exclude: [/node_modules/, config.build],
          options: mainBabelOptions,
        },
      ],
    },
    plugins: [
      new OverrideConfigWebpackPlugin(
        {},
        { dev: options.env === 'development' },
        webpack,
      ),
      // We define some sensible Webpack flags. One for the Node environment,
      // and one for dev / production. These become global variables. Note if
      // you use something like eslint or standard in your editor, you will
      // want to configure __DEV__ as a global variable accordingly.
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(options.env),
        __DEV__: options.env === 'development',
      }),
      new webpack.DefinePlugin(dotenv.stringified),
      // The FriendlyErrorsWebpackPlugin (when combined with source-maps)
      // gives Lectro its human-readable error messages.
      new FriendlyErrorsWebpackPlugin({
        clearConsole: options.env === 'development',
      }),
      // The NoEmitOnErrorsPlugin plugin prevents Webpack
      // from printing out compile time stats to the console.
      new webpack.NoEmitOnErrorsPlugin(),
    ],
  };
};
