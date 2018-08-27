const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const poststylus = require('poststylus')
const isProd = process.env.NODE_ENV === "production";

module.exports = {
  entry: {
    main: './src/js/main.js',
    getAllUserData: './src/js/getAllUserData.js'
  },
  output: {
    path: path.resolve(__dirname, "docs/")
  },
  watch: true,
  watchOptions: {
    ignored: /node_modules/
  },
  resolve: {
    extensions: [".js", ".css", ".styl"]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader"
          }
        ]
      },
      {
        test: /\.styl$/,
        use: [
          "style-loader",
          'css-loader',
          'stylus-loader'
        ]
      },
      {
        test: /\.(png|jpg|gif|svg)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              publicPath: "./img/",
              outputPath: "img/"
            }
          },
          {
            loader: "image-webpack-loader"
          }
        ]
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              publicPath: "./fonts/",
              outputPath: "fonts/"
            }
          }
        ]
      }
    ]
  },
  devServer: {
    stats: "errors-only",
    port: 9090,
  },
  optimization: {

  },
  plugins: [
    new HtmlWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "style.css"
    }),
    // new webpack.ProvidePlugin({
    //   $: 'jquery',
    //   jQuery: 'jquery',
    //   'window.jQuery': 'jquery'
    // }),
    new webpack.LoaderOptionsPlugin({
      test: /\.styl$/,
      stylus: {
        default: {
          use: [poststylus()],
        },
      },
      options: {
        stylus: {
          use: [poststylus(['autoprefixer'])]
        }
      }
    })
  ]
};

console.log(isProd
  ? "===== It is Production ====="
  : "===== It is Devolopment ====="
);
