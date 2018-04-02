const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { ReactLoadablePlugin } = require('react-loadable/webpack')

const common = {
  context: __dirname,
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.css'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules']
  },
  target: 'web',
  entry: './src/Client.tsx',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Production',
      template: './index.html'
    }),
    new ExtractTextPlugin({
      filename: 'app.bundle.css'
    }),
    new ReactLoadablePlugin({
      filename: './dist/react-loadable.json'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity
    })
  ]
}

module.exports = common
