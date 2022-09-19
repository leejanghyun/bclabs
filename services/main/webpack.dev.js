const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
  devServer: {
    port: 8080,
    hot: true,
    open: true,
    historyApiFallback: true,
    allowedHosts: 'all',
    proxy: {
      '/v2/*': {
        target: 'https://mi-console-api-dev-dkptan5aba-du.a.run.app',
        changeOrigin: true,
      },
    },
  },
  devtool: 'inline-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: false,
    }),
    new CleanWebpackPlugin(),
    new Dotenv({ path: `${path.join(__dirname, '/.env')}` }),
  ],
});
