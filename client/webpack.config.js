const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const jsConfig = require('./jsconfig.json');

const CSSModuleLoader = {
  loader: 'css-loader',
  options: {
    modules: {
      localIdentName: '[name]__[local]___[hash:base64:5]',
    },
    importLoaders: 2,
    sourceMap: true,
  },
};

const CSSLoader = {
  loader: 'css-loader',
  options: {
    modules: 'global',
    importLoaders: 2,
    sourceMap: true,
  },
};

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    historyApiFallback: true,
    open: true,
    compress: true,
    hot: true,
    port: 3000,
  },
  entry: [path.resolve(__dirname, 'src', 'index.js')],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    publicPath: '/',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'public'),
          to: 'assets',
          globOptions: {
            ignore: ['*.DS_Store', '**/favicon.ico', '**/index.html'],
          },
          noErrorOnMissing: true,
        },
      ],
    }),
    new HtmlWebpackPlugin({
      title: 'Agis',
      favicon: path.resolve(__dirname, 'public') + '/favicon.ico',
      template: path.resolve(__dirname, 'public') + '/index.html',
      filename: 'index.html',
    }),
  ],
  module: {
    rules: [
      { test: /\.(js|jsx)$/, use: ['babel-loader'] },
      { test: /\.(?:ico|gif|png|jpg|jpeg)$/i, type: 'asset/resource' },
      {
        test: /\.css$/,
        exclude: /\.module\.css$/,
        use: [
          'style-loader',
          CSSLoader,
          { loader: 'postcss-loader', options: { sourceMap: true } },
        ],
      },
      {
        test: /\.module\.css$/,
        use: [
          'style-loader',
          CSSModuleLoader,
          { loader: 'postcss-loader', options: { sourceMap: true } },
        ],
      },
    ],
  },
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    extensions: ['.js', '.jsx'],
    alias: Object.keys(jsConfig.compilerOptions.paths).reduce(
      (aliases, aliasName) => {
        aliases[aliasName.split('/')[0]] = path.resolve(
          path.resolve(__dirname, 'src'),
          `${jsConfig.compilerOptions.paths[aliasName][0].split('/')[0]}`
        );

        return aliases;
      },
      { assets: path.resolve(__dirname, 'public') }
    ),
  },
};
