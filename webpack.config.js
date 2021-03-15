const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");

const config = (env, args) => {
  const config = {
    entry: ["babel-polyfill", path.resolve(__dirname, "src", "index.js")],
    output: {
      path: path.resolve(__dirname, './dist'),
    },
    resolve: {
      extensions: [".js", ".jsx"],
    },
    module: {
      rules: [
        {
            test: /\.(svg|eot|ttf|woff|woff2)$/,
            loader: "url-loader",
        },
        {
          test: /\.(png|jpe?g|gif|ico|mp3)$/i,
          exclude: /node_modules/,
          use: [ 'file-loader?name=[name].[ext]' ]
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
      ],
    },
    watchOptions: {
      poll: 1000,
      ignored: /node_modules/,
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        filename: "index.html",
        inject: true,
        template: path.resolve(__dirname, "public/index.html"),
        favicon: path.resolve(__dirname, "public/favicon.ico"),
      }),
      new MiniCssExtractPlugin({
        filename: "css/[name].css",
      }),
    ],
    optimization: {
      runtimeChunk: true,
      minimize: true,
      minimizer: [
        new TerserPlugin({
          parallel: true,
        }),
        new OptimizeCssAssetsPlugin(),
        new CssMinimizerPlugin(),
      ],
    },
    devServer: {
      clientLogLevel: "silent",
      historyApiFallback: true,
      port: 5052,
      compress: true,
      hot: true,
      open: true,
      watchContentBase: true
    },
  };

  if (args.mode === "production") {
    config.performance = {
      hints: false,
    };
    config.optimization.minimizer = [];
    config.optimization.minimizer.push(
      new UglifyJSPlugin({
        uglifyOptions: {
          compress: {
            drop_console: true,
          },
        },
      })
    );
  }

  return config;
};

module.exports = config;
