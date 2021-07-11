/*eslint no-undef: "off"*/
/*eslint sort-keys: "off"*/

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: 'all'
    }
  };

  if (isProd) config.minimizer = [
    new OptimizeCssAssetsWebpackPlugin({
      cssProcessorPluginOptions: {
        preset: ['default', { discardComments: { removeAll: true } }],
      }
    }),
    new TerserWebpackPlugin()
  ]

  return config;
};

const fileame = (ext) => isDev ? `[name].${ext}` : `[name].[fullhash].${ext}`;

const cssLoaders = (extra) => {
  const loaders = [{
      loader: MiniCssExtractPlugin.loader,
      options: {
        publicPath: ''
      }
    },
    'css-loader',
  ];

  if (extra) {
    loaders.push(extra);
  }

  return loaders;
};

const pluginsSet = () => {
  const plugins = [
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [{
        from: path.resolve(__dirname, 'src/favicon.png'),
        to: path.resolve(__dirname, 'dist'),
      }]
    }),
    new MiniCssExtractPlugin({
      filename: fileame('css'),
    })
  ];

  // if (isDev) {}
  // if (isProd) {}

  return plugins;
};

const babelOptions = (preset) => {
  const options = {
    presets: ['@babel/preset-env']
  };

  if (preset) {
    options.presets.push(preset);
  }

  return options;
};

const jsLoaders = () => {
  const loaders = [{
    loader: "babel-loader",
    options: babelOptions(),
  }];

  if (isDev) {
    loaders.push('eslint-loader');
  }

  return loaders;
};

module.exports = {
  path,
  isDev,
  isProd,
  optimization,
  fileame,
  cssLoaders,
  pluginsSet,
  babelOptions,
  jsLoaders
};