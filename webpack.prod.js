const merge = require('webpack-merge')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const common = require('./webpack.common.js')
const webpack = require('webpack')
const path = require('path')
const nodeExternals = require('webpack-node-externals')

const serverConfig = {
  context: __dirname,
  entry: './server/index.ts',
  watch: true,
  devtool: 'source-map',
  externals: [nodeExternals()],
  target: 'node',
  node: {
    __dirname: true,
    __filename: true
  },
  output: {
    path: path.resolve(__dirname, 'dist-server'),
    filename: 'index.js',
    publicPath: '/dist-server/'
  },
  resolve: {
    extensions: ['.tsx', '.jsx', '.ts', '.js', '.json'],
    modules: [
      path.resolve(__dirname, 'server'),
      path.resolve(__dirname, 'src'),
      'node_modules'
    ]
  },
  stats: {
    colors: true,
    reasons: true,
    chunks: true
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader'
      },
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        loader: ['eslint-loader', 'source-map-loader']
      },
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      },
      {
        include: [path.resolve(__dirname, 'server')],
        exclude: [path.resolve(__dirname, 'node_modules')],
        test: /\.(png|jpg|gif|json)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]'
            }
          }
        ]
      }
    ]
  }
}

const clientConfig = merge(common, {
  plugins: [
    new UglifyJSPlugin({ sourceMap: true }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
})

module.exports = [serverConfig, clientConfig]