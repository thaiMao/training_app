const webpack = require('webpack')
const path = require('path')
// const nodeExternals = require('webpack-node-externals')
const StartServerPlugin = require('start-server-webpack-plugin')
const { ReactLoadablePlugin } = require('react-loadable/webpack')

const common = {
  context: __dirname,
  entry: ['index.ts'],
  watch: true,
  target: 'node',
  node: {
    __dirname: true,
    __filename: true
  },
  // externals: [nodeExternals({ whitelist: ['webpack/hot/poll?1000'] })],
  output: {
    path: path.resolve('dist', 'private', 'isomorphic'),
    filename: 'server.js',
    publicPath: ''
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.jsx', '.js', '.json'],
    modules: [
      path.resolve(__dirname),
      path.resolve(__dirname, '../src'),
      path.resolve(__dirname, '../'),
      '../node_modules'
    ]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader:
          'awesome-typescript-loader?configFileName=tsconfig.isomorphic.json'
      },
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        loader: ['eslint-loader', 'source-map-loader'],
        include: [path.resolve(__dirname)],
        exclude: [path.resolve(__dirname, '../node_modules')]
      },
      {
        include: [path.resolve(__dirname)],
        exclude: [path.resolve(__dirname, '../node_modules')],
        test: /\.jsx?$/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new StartServerPlugin({
      name: 'server.js'
    }),
    // new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new ReactLoadablePlugin({
      filename: path.resolve('dist', 'react-loadable.json')
    })
  ]
}

module.exports = common
