const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './app/index',

  output: {
    filename: 'opensupport.js',
    path: path.resolve(__dirname, 'public'),
  },

  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',

      options: {
        presets: ['es2015'],
      },
    }, {
      test: /\.(scss|css)$/,

      use: [{
        loader: 'style-loader',
      }, {
        loader: 'css-loader',
      }, {
        loader: 'sass-loader',
      }],
    }],
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'OpenSupport',
      template: 'app/index.html',
    }),
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
      API_URL: JSON.stringify(process.env.API_URL || 'http://localhost:3030'),
    }),
  ],
};
