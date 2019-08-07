const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const varConfig = require('../var/static.config.json');

function resolve(p) {
  return path.resolve(__dirname, p);
}
const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  mode: 'development',
  entry: resolve('src/module/app.tsx'),
  output: {
    filename: `[name]${isDev ? '' : '.[contenthash:10]'}.js`,
    path: varConfig.distDir,
    publicPath: varConfig.cdnPrefix,
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: varConfig.distDir,
    port: 3010,
  },
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
  },
  module: {
    rules: [
      // 处理less样式文件，非开发环境使用MiniCssExtractPlugin
      {
        test: /\.less$/,
        use: [
          { loader: isDev ? 'style-loader' : MiniCssExtractPlugin.loader },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: 'less-loader',
          },
        ],
      },
      // 处理ts和tsx文件
      {
        test: /\.tsx?$/,
        use: 'babel-loader',
      },
      // 处理图片（css background图片、img require图片）
      // 小于10k的图片，将会被转成base64 code
      {
        test: /\.(jpg|png|gif|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name].[hash:10].[ext]',
              limit: 10 * 1024,
            },
          },
        ],
      },
      // 处理字体资源，小于10k会被转成base64 code
      {
        test: /\.(eot|ttf|woff)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name].[hash:10].[ext]',
              limit: 10 * 1024,
            },
          },
        ],
      },

      // 处理音频资源
      {
        test: /\.(wav|mp3)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash:10].[ext]',
            },
          },
        ],
      },

      // 处理视频资源
      {
        test: /\.(mp4)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash:10].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: resolve('src/template/index.html'),
      inject: true,
      alwaysWriteToDisk: true,
    }),
    new HtmlWebpackHarddiskPlugin({
      outputPath: varConfig.distDir,
      filename: 'index.html',
      alwaysWriteToDisk: true,
    }),
  ].concat(
    isDev
      ? []
      : [
          new MiniCssExtractPlugin({
            filename: `[name].[contenthash:10].css`,
          }),
        ]
  ),
};
