const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackHarddiskPlugin = require("html-webpack-harddisk-plugin");

module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, "../src/module/index.js"),
  output: {
    filename: "[index].bundle.js",
    path: "/Users/eago/Projects/wyc_projects/play-project/var/static"
  },
  devtool: "inline-source-map",
  devServer: {
    contentBase: "/Users/eago/Projects/wyc_projects/play-project/var/static",
    port: 4000
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template:
        "/Users/eago/Projects/wyc_projects/play-project/static/src/template/index.html",
      inject: true
    }),
    new HtmlWebpackHarddiskPlugin({
      outputPath: "/Users/eago/Projects/wyc_projects/play-project/var/static"
    })
  ]
};
