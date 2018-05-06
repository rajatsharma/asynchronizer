const EnhancerCommonutils = require('@lectro/enhancer-commonutils');
const Lectro = require('@lectro/core');
const WebpackBar = require('webpackbar'); // eslint-disable-line

const Asynchroniser = new Lectro('node');
module.exports = Asynchroniser.use(EnhancerCommonutils)
  .extend((config) => {
    config.plugins.push(new WebpackBar({ name: 'Asynchroniser' }));
    return config;
  });
