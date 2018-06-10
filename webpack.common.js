const path = require('path')
const nodeExternals = require('webpack-node-externals')
const StartServerPlugin = require('start-server-webpack-plugin')
const webpack = require('webpack')

const Client = {
  context: __dirname,
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.css'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules']
  },
  target: 'web',
  entry: './src/Client.tsx',
  output: {
    filename: 'app.[name]-[hash].bundle.js',
    path: path.resolve(__dirname, './dist'),
    publicPath: '/'
  }
}

const Server = {
  context: __dirname,
  entry: ['webpack/hot/poll?1000', './server/index.ts'],
  watch: true,
  target: 'node',
  node: {
    __dirname: true,
    __filename: true
  },
  externals: [nodeExternals({ whitelist: ['webpack/hot/poll?1000'] })],
  output: {
    path: path.resolve('dist', 'private', 'isomorphic'),
    filename: 'server.js',
    publicPath: ''
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.jsx', '.js', '.json'],
    modules: [
      path.resolve(__dirname, 'server'),
      path.resolve(__dirname, 'src'),
      path.resolve(__dirname),
      'node_modules'
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
        include: [path.resolve(__dirname, 'server')],
        exclude: [path.resolve(__dirname, 'node_modules')]
      },
      {
        include: [path.resolve(__dirname, 'server')],
        exclude: [path.resolve(__dirname, 'node_modules')],
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
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
}

module.exports = { Client, Server }
