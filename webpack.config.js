const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const poststylus = require('poststylus')
const isProd = process.env.NODE_ENV === "production";

module.exports = {
  entry: {
    main: './src/js/main.js',
    getAllUserData: './src/js/getAllUserData.js',
    modals: './src/js/modals.js',
  },
  output: {
    path: path.resolve(__dirname, "docs/")
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
        test: /\.pug/,
        use: 'pug-loader'
      },
      {
        test: [/\.styl$/, /\.css$/],
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true
              }
            },
            {
              loader: 'stylus-loader'
            }
          ],
          publicPath: __dirname + '/dist'
        })
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
    minimize: true
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new ExtractTextPlugin({
      filename: "./src/style/styles.bundle.css",
      allChunks: true
    }),
    // new MiniCssExtractPlugin({
    //   filename: "[name].css",
    //   chunkFilename: "[id].css"
    // }),
    new webpack.ProvidePlugin({
      // $: 'jquery',
      // jQuery: 'jquery',
      // 'window.jQuery': 'jquery',
      // moment: 'moment'
    }),
    new webpack.LoaderOptionsPlugin({
      test: /\.styl$/i,
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
