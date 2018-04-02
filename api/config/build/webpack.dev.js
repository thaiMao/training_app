const merge = require('webpack-merge')
const common = require('./webpack.common.js')

const devConfig = {
  devtool: 'source-map',
  stats: {
    colors: true,
    reasons: true,
    chunks: true
  }
}

module.exports = merge(common, devConfig)
