const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const nodeExternals = require('webpack-node-externals')
const StartServerPlugin = require('start-server-webpack-plugin')
const webpack = require('webpack')

const serverConfig = {
  context: __dirname,
  entry: ['webpack/hot/poll?1000', './server/index.ts'],
  watch: true,
  devtool: 'source-map',
  target: 'node',
  node: {
    __dirname: true,
    __filename: true
  },
  externals: [nodeExternals({ whitelist: ['webpack/hot/poll?1000'] })],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'server.js',
    publicPath: '/dist/'
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
    modules: [path.resolve(__dirname, 'server'), 'node_modules']
  },
  stats: {
    colors: true,
    reasons: true,
    chunks: true
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader'
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: ['eslint-loader', 'source-map-loader'],
        include: [path.resolve(__dirname, 'server')],
        exclude: [path.resolve(__dirname, 'node_modules')]
      },
      {
        include: [path.resolve(__dirname, 'server')],
        exclude: [path.resolve(__dirname, 'node_modules')],
        test: /\.js$/,
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
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ]
}

const clientConfig = {
  context: __dirname,
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './src/Client.tsx'
  ],
  devtool: 'cheap-eval-source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules']
  },
  stats: {
    colors: true,
    reasons: true,
    chunks: true
  },
  devServer: {
    hot: true,
    publicPath: '/dist/',
    historyApiFallback: true
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
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin(),
    new ExtractTextPlugin({
      filename: 'dist/[name].bundle.css',
      allChunks: true
    })
  ]
}

module.exports = [clientConfig, serverConfig]
