const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackHarddiskPlugin = require("html-webpack-harddisk-plugin");
const varConfig = require("../var/static.config.json");

function resolve(p) {
  return path.resolve(__dirname, p);
}
module.exports = {
  mode: "development",
  entry: resolve("src/module/app.tsx"),
  output: {
    filename: "[index].bundle.js",
    path: varConfig.distDir,
    publicPath: varConfig.cdnPrefix
  },
  devtool: "inline-source-map",
  devServer: {
    contentBase: varConfig.distDir,
    port: 3010
  },
  resolve: {
    modules: [path.resolve(__dirname, "src"), "node_modules"],
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json"]
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1
            }
          },
          {
            loader: "less-loader"
          }
        ]
      },
      {
        test: /\.tsx?$/,
        use: "babel-loader"
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: resolve("src/template/index.html"),
      inject: true,
      alwaysWriteToDisk: true
    }),
    new HtmlWebpackHarddiskPlugin({
      outputPath: varConfig.distDir,
      filename: "index.html",
      alwaysWriteToDisk: true
    })
  ]
};
