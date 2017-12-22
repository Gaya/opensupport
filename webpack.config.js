const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './app/index',

  output: {
    filename: 'opensupport.js',
    path: path.resolve(__dirname, 'public'),
  },

  devtool: process.env.NODE_ENV !== 'production' ? 'source-map' : false,

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
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader', 'sass-loader'],
      }),
    }, {
      test: /\.svg$/,
      loader: 'svg-inline-loader',
    }],
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'OpenSupport',
      template: 'app/index.html',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      },
      API_URL: JSON.stringify(process.env.API_URL || 'http://localhost:3030'),
    }),
    new ExtractTextPlugin({
      filename: 'style.css',
      disable: process.env.NODE_ENV !== 'production',
    }),
  ],
};
