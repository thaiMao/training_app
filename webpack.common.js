const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')
const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const nodeExternals = require('webpack-node-externals')
const StartServerPlugin = require('start-server-webpack-plugin')

const serverConfig = {
  context: __dirname,
  entry: ['webpack/hot/poll?1000', './api/index.ts'],
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
    extensions: ['.ts', '.js', '.json', '.gql', '.graphql'],
    modules: [path.resolve(__dirname, 'api'), 'node_modules']
  },
  stats: {
    colors: true,
    reasons: true,
    chunks: true
  },
  module: {
    rules: [
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        use: {
          loader: 'raw-loader'
        }
      },
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader'
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: ['eslint-loader', 'source-map-loader'],
        include: [path.resolve(__dirname, 'api')],
        exclude: [path.resolve(__dirname, 'node_modules')]
      },
      {
        include: [path.resolve(__dirname, 'api')],
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

const common = {
  context: __dirname,
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.css'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules']
  },
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './src/Client.tsx'
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: ''
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
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
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
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      title: 'Production',
      template: './index.html'
    }),
    new ExtractTextPlugin({
      filename: 'app.bundle.css'
    })
  ]
}

module.exports = [common, serverConfig]
