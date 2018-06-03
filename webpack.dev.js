const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')

const devConfig = {
  devtool: 'cheap-eval-source-map',
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './src/Client.tsx'
  ],
  stats: {
    colors: true,
    reasons: true,
    chunks: true
  },
  devServer: {
    hot: true,
    publicPath: '/',
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader?configFileName=tsconfig.client.json'
      },
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        loader: ['eslint-loader', 'source-map-loader'],
        exclude: [path.resolve(__dirname, 'node_modules')]
      },
      {
        include: [path.resolve(__dirname, 'src')],
        exclude: [path.resolve(__dirname, 'node_modules')],
        test: /\.jsx?$/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.worker\.js$/,
        use: { loader: 'worker-loader' }
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      title: 'Production',
      template: './index.html'
    }),
    new ExtractTextPlugin({
      filename: 'app.bundle.css'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity
    }),
    new ManifestPlugin({
      fileName: 'asset-manifest.json'
    })
  ]
}

module.exports = merge(common, devConfig)
