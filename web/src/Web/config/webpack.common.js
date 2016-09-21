var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');

module.exports = {
  entry: {
    'polyfills': './app/polyfills.ts',
    'vendor': './app/vendor.ts',
    'app': './app/main.ts'
  },

  resolve: {
    extensions: ['', '.js', '.ts']
  },

  module: {
    loaders: [
      {
        test: /\.ts$/,
        loaders: ['ts', 'angular2-template-loader']
      },
      {
        test: /\.html$/,
        loader: 'html'
      },
      {
          test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico|json)(\?.*$|$)/,
        loader: 'file?name=assets/[name].[hash].[ext]'
      },
      {
        test: /\.(css|scss)$/,
        exclude: helpers.root('app', 'components'),
        loader: ExtractTextPlugin.extract('style', 'css?sourceMap?scss')
      },
      {
          test: /\.(css|scss)/,
        include: helpers.root('app', 'components'),
        loader: 'raw!sass-loader'
      }
    ]
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfills']
    }),
    new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery"
    })
  ]
};
