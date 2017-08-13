"use strict";

const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpack = require("webpack");

module.exports = [
  // JavaScript
  {
    context: path.join(__dirname, "src", 'js'),
    entry: {
      main: './main.js'
    },
    output: {
      filename: './js/[name].bundle.js',
      path: path.resolve(__dirname, 'assets')
    },
    watch   : true,
    devtool: "source-map",
    plugins: [
      new webpack.ProvidePlugin( {
        $                : "jquery",
        jQuery           : "jquery",
        "windows.jQuery" : "jquery"
      } ),
      new UglifyJSPlugin({
        sourceMap: true,
        exclude : /node_modules/
      })
    ]
  },
  // Css ( included Fonts, Background - images for css - styles )
  {
    context: path.join(__dirname, "src", 'sass'),
    entry: {
      main: './main.scss',
      // 'common' : './common.scss' // for creating another css - files
    },
    output: {
      filename: './css/[name].bundle.css',
      path: path.resolve(__dirname, 'assets')
    },
    watch   : true,
    devtool: "source-map",
    module: {
      rules: [
        // Sass
        {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract({
            use: [
              {loader: 'css-loader', options: {sourceMap: true, minimize: false}},
              {loader: 'sass-loader', options: {sourceMap: true}},
              // {loader: 'source-map-loader', options: {sourceMap: true}} // test for another source-maps
            ]
          })
        },
        // Fonts
        {
          test: /\.(eot|ttf|woff|woff2)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                publicPath: '../',
                outputPath: 'fonts/',
                name: '[name]/[name].[ext]'
              }
            }
          ]
        },
        // Images for css property - background
        {
          test    : /\.(jpe?g|png|gif|svg)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                publicPath: '../',
                outputPath: 'img/',
                name: '[name].[ext]'
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new ExtractTextPlugin({
        filename: './css/[name].bundle.css'
      })
    ]
  }
];









