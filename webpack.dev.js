const path = require('path')
const merge = require('webpack-merge')
const [common, serverConfig] = require('./webpack.common.js')

const clientConfig = {
  devtool: 'cheap-eval-source-map',
  stats: {
    colors: true,
    reasons: true,
    chunks: true
  },
  devServer: {
    hot: true,
    publicPath: '/dist/',
    historyApiFallback: true
  }
}

module.exports = [merge(common, clientConfig), serverConfig]
