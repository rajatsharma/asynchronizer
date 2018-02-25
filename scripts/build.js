const packer = require('@hellpack/packer');
const webpackConfig = require('../paths');

packer(webpackConfig).then(_ => console.log('Done')).catch(e => console.log(e)); // eslint-disable-line
