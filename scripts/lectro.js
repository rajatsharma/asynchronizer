const EnhancerCommonutils = require('@lectro/enhancer-commonutils');
const EnhancerBuildutils = require('@lectro/enhancer-buildutils');
const Lectro = require('@lectro/core');
const WebpackBar = require('webpackbar');

const settr = (obj, key, val) => {
  obj[key] = val; //eslint-disable-line
};

const Asynchroniser = new Lectro('node');

module.exports = Asynchroniser.use(EnhancerCommonutils)
  .use(EnhancerBuildutils)
  .extend(config => {
    config.plugins.push(new WebpackBar({ name: 'Asynchroniser' }));
    return config;
  })
  .tap(config => {
    settr(config, 'devtool', false);
    settr(
      config,
      'plugins',
      config.plugins.filter(x => (x.banner ? x.banner.length > 100 : x)),
    );
  });
