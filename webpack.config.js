/*eslint no-undef: "off"*/
/*eslint sort-keys: "off"*/
/*eslint no-unused-vars: "off"*/

const {
  path,
  isDev,
  isProd,
  optimization,
  fileame,
  cssLoaders,
  pluginsSet,
  babelOptions,
  jsLoaders
} = require('./webpack-base.config');

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: {
    main: './index.jsx',
    stat: './stats.ts'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: fileame('js'),
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.ts', '.tsx'],
    alias: {
      '@model': path.resolve(__dirname, 'src/model'),
      '@css': path.resolve(__dirname, 'src/css'),
      '@assets': path.resolve(__dirname, 'src/assets')
    }
  },
  optimization: optimization(),
  devServer: {
    port: 4200
  },
  devtool: isDev ? 'source-map' : false,
  plugins: pluginsSet(),
  module: {
    rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        use: jsLoaders()
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: babelOptions('@babel/preset-typescript')
        }
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: babelOptions('@babel/preset-react')
        }
      },
      {
        test: /\.css$/,
        use: cssLoaders()
      },
      {
        test: /\.less$/,
        use: cssLoaders('less-loader')
      },
      {
        test: /\.s[ac]ss$/,
        use: cssLoaders('sass-loader')
      },
      {
        test: /\.png|jpeg|jpq|svg|gif|webp$/,
        use: ['file-loader']
      },
      {
        test: /\.ttf|woff|woff2|eot$/,
        use: ['file-loader']
      },
      {
        test: /\.xml$/,
        use: ['xml-loader']
      },
      {
        test: /\.csvl$/,
        use: ['csv-loader']
      }
    ]
  }
};