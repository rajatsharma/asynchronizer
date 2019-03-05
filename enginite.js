module.exports = {
  template: ['src', '.gitignore', '.editorconfig'],
  requireables: [
    'scripts/dev.js',
    'scripts/build.js',
    'scripts/clibuild.js',
    'babel.config.js',
  ],
  bin: 'en-asynchronizer',
  packageScripts: ['dev', 'build', 'cli'],
};
