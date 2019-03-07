/* eslint-disable no-console */
// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';
/* eslint-disable import/no-dynamic-require */
// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
  throw err;
});

// Ensure environment variables are read.
const webpack = require('webpack');
const path = require('path');
const { spawn } = require('child_process');
const config = require('../config/webpack.config')({ env: 'development' });
const devserverConfig = require('../config/webpack.devserver.config');
const logger = require('../config/logger');

const isInteractive = process.stdout.isTTY;

function clearConsole() {
  process.stdout.write(
    process.platform === 'win32' ? '\x1B[2J\x1B[0f' : '\x1B[2J\x1B[3J\x1B[H',
  );
}

function createCompiler(_webpack, _config) {
  // "Compiler" is a low-level interface to Webpack.
  // It lets us listen to some events and provide our own custom messages.
  let compiler;
  try {
    compiler = _webpack(_config);
  } catch (err) {
    logger.error('Failed to compile.');
    console.log();
    console.log(err.message || err);
    console.log();
    process.exit(1);
  }

  // "invalid" event fires when you have changed a file, and Webpack is
  // recompiling a bundle. WebpackDevServer takes care to pause serving the
  // bundle, so if you refresh, it'll wait instead of serving the old one.
  // "invalid" is short for "bundle invalidated", it doesn't imply any errors.
  compiler.plugin('invalid', () => {
    if (isInteractive) {
      clearConsole();
    }
    logger.info('Compiling...');
  });

  // "done" event fires when Webpack has finished recompiling the bundle.
  // Whether or not you have warnings or errors, you will get this event.
  compiler.plugin('done', stats => {
    // if (isInteractive) {
    //   clearConsole();
    // }

    console.log(stats.toString({ colors: true }, true));
  });
  return compiler;
}

if (process.env.HOST) {
  logger.info(
    `Attempting to bind to HOST environment variable: ${logger.yellow(
      logger.bold(process.env.HOST),
    )}`,
  );
  logger.warn(
    `If this was unintentional, check that you haven't mistakenly set it in your shell.`,
  );
  console.log();
}

const compiler = createCompiler(webpack, config);

let previous = null;

compiler.watch(devserverConfig.watchOptions || {}, _ => {
  const serverPaths = Object.keys(compiler.options.entry).map(entry =>
    path.join(compiler.options.output.path, `${entry}.js`),
  );

  if (previous) process.kill(-previous.pid);
  previous = spawn('node', [serverPaths[0], ...process.argv.slice(2)], {
    stdio: 'inherit',
    detached: true,
    cwd: process.cwd(),
  });
});

['SIGINT', 'SIGTERM'].forEach(sig => {
  process.on(sig, () => {
    logger.info('Killing Devserver');
    process.kill(-previous.pid);
    process.exit();
  });
});
