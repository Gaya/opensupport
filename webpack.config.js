const webpack = require('webpack')
const path = require('path')


module.exports = {
  entry: './app/index',

  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'public/assets')
  },

  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',

      options: {
        presets: ['es2015']
      }
    }, {
      test: /\.(scss|css)$/,

      use: [{
        loader: 'style-loader'
      }, {
        loader: 'css-loader'
      }, {
        loader: 'sass-loader'
      }]
    }]
  },

  plugins: []
};
