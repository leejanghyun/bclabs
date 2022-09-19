const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const TerserPlugin = require('terser-webpack-plugin');
const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const mode = process.env.NODE_ENV || 'development';

// Devserver Config
const devServer = {
  port: 8080,
  hot: mode !== 'production',
  open: true,
  historyApiFallback: true,
  allowedHosts: 'all',
  proxy: {
    '/v3/*': {
      target: 'https://www.googleapis.com/calendar',
      changeOrigin: true,
    },
  },
};

module.exports = {
  mode,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    chunkFilename: '[name].js',
    publicPath: '/',
  },
  optimization:
    mode === 'production'
      ? {
          minimize: true,
          minimizer: [
            new TerserPlugin({
              extractComments: true,
              minify: TerserPlugin.uglifyJsMinify,
              terserOptions: {
                compress: {
                  drop_console: true,
                },
              },
            }),
          ],
          splitChunks: {
            chunks: 'all',
          },
        }
      : {},
  module: {
    rules: [
      {
        test: /\.(jpg|png|svg|gif)$/,
        type: 'asset/resource',
      },
      {
        test: /\.(ts|js)x?$/,
        exclude: '/node_module/',
        use: ['babel-loader', 'ts-loader'],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              fallback: 'file-loader',
            },
          },
        ],
      },
    ],
  },
  performance: {
    maxAssetSize: 1000000000,
    maxEntrypointSize: 1000000000,
    hints: 'warning',
  },
  resolve: {
    plugins: [
      new TsconfigPathsPlugin({
        configFile: path.resolve(__dirname, 'tsconfig.json'),
      }),
    ],
    extensions: ['.tsx', '.ts', '.js'],
  },
  devServer:
    mode === 'production'
      ? {
          static: {
            directory: path.join(__dirname, 'dist'),
            publicPath: 'dist',
          },
          ...devServer,
        }
      : devServer,
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify:
        process.env.NODE_ENV === 'production'
          ? {
              collapseWhitespace: true,
              removeComments: true,
            }
          : false,
    }),
    new CleanWebpackPlugin(),
    new Dotenv({ path: `${path.join(__dirname, '/.env')}` }),
  ],
};
