const path = require('path');
const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin');

const mode = process.env.NODE_ENV || 'development';

module.exports = {
  mode,
  entry: [path.join(__dirname, 'src/index.tsx')],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    chunkFilename: '[name].js',
    publicPath: '/',
  },
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
};
