const NODE_ENV = process.env.NODE_ENV || 'development';
const isProduction = NODE_ENV.trim() === 'production';
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const CopyWebpackPlugin = require('copy-webpack-plugin');

const PATHS = {
  src: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'public')
};

const config = {
  entry: [
    'babel-polyfill',
    'react-hot-loader/patch',
    './src/index.js'
  ],
  output: {
    path: PATHS.build,
    publicPath: '',
    filename: 'app.bundle.[hash].js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: 'body',
      title: 'App',
      template: 'src/assets/template.html',
      hash: true
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'commons',
      minChunks: Infinity,
      filename: 'commons.bundle.[hash].js'
    }),
    new ExtractTextPlugin({
      filename: '[name].[hash].css',
      allChunks: true,
      disable: !isProduction
    }),
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(NODE_ENV)
    }),
    new CopyWebpackPlugin([
      { from: './src/assets/images/', to: './public/images/' },
      { from: './src/assets/fonts', to: './public/fonts' },
    ]),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(sass|scss|css)/,
        exclude: /(node_modules)/,
        loader: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: isProduction
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            },
          ],
          fallback: 'style-loader'
        })
      },
      {
        test: /\.(gif|png|jpg|jpeg|svg)$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, './src/assets/images'),
        use: 'url-loader?limit=10000&name=assets/[name]-[hash].[ext]'
      },
    ]
  },
  resolve: {
    alias: {
      'components': path.resolve(__dirname, './src/components'),
      'containers': path.resolve(__dirname, './src/containers'),
      'actions': path.resolve(__dirname, './src/redux'),
      'assets': path.resolve(__dirname, './src/assets'),
      'utils': path.resolve(__dirname, './src/util'),
      'constants': path.resolve(__dirname, './src/constants')
    }
  },
  devServer: {
    contentBase: './src',
    hot: true,
    inline: true,
    port: 8080,
    historyApiFallback: true,
    host: '0.0.0.0'
  },
  devtool: isProduction ? 'eval' : 'inline-cheap-module-source-map',
};

if (isProduction) {
  config.plugins.push(
    new UglifyJsPlugin({
      parallel: 4,
      uglifyOptions: {
        compress: true,
        mangle: true,
        minimize: true
      }
    }));
}
module.exports = function (env = {}) {
  if (env.runAnalyzer) {
    config.plugins.push(new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: true,
    }));
  }
};

module.exports = config;