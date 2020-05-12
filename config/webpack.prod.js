const path = require("path");
const webpack = require("webpack");
const helpers = require("./helpers");

const HtmlWebpackPlugin = require("html-webpack-plugin");
var BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

const ENV = (process.env.NODE_ENV = process.env.ENV = "production");

module.exports = {
  entry: {
    //  polyfills: "./public/polyfills.ts",
    // vendor: "./public/vendor.ts",
    ng1: "./public/index.ts"
    // app: "./public/main.ts"
  },

  output: {
    path: helpers.root("dist/aot"),
    publicPath: "/",
    filename: "[name].bundle.js",
    chunkFilename: "[id].chunk.js"
  },

  resolve: {
    extensions: [".ts", ".js"]
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        loaders: ["awesome-typescript-loader", "angular2-template-loader"]
      },
      {
        test: /\.html$/,
        loader: "html-loader"
      }
    ]
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: "ng1", //common
      //minChunks: Infinity
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      chunks: ["vendor", "app"],
      minChunks: 2
    }),

    /*new webpack.SourceMapDevToolPlugin({
      filename: "[file].map[query]",
      moduleFilenameTemplate: "[resource-path]",
      fallbackModuleFilenameTemplate: "[resource-path]?[hash]",
      sourceRoot: "webpack:///"
    }),*/

    new HtmlWebpackPlugin({
      template: "config/index.html"
    }),
    new webpack.optimize.UglifyJsPlugin({
      beautify:false,
      comments:false,
      compress:{
        warnings: false
      },
      //mangle:false
    }),

    new webpack.DefinePlugin({
      "process.env": {
        ENV: JSON.stringify(ENV)
      }
    })

    ,new BundleAnalyzerPlugin({
       analyzerMode: 'static'
     })
  ]
};
