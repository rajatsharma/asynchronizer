const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
  pursFiles: resolveApp('src/**/*.purs'),
  pscPackages: resolveApp('.psc-package/purescript-*/src/**/*.purs'),
  src: resolveApp('src'),
  build: resolveApp('build'),
  dotenv: resolveApp('.env'),
  userNodeModulesPath: resolveApp('node_modules'),
};
