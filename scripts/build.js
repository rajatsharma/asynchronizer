const { removeSync } = require('fs-extra')
const webpack = require('webpack')

removeSync('dist')
webpack(require('../webpack.config.js'), function (err, stats) {
  if (err) {
    console.log(err)
    return
  }

  console.log(stats.toString({
    colors: true,
    chunks: false
  }))
})
