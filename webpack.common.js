const path = require('path')

const common = {
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

module.exports = common
