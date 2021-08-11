import path from 'path';
import { Configuration } from 'webpack';
import { config } from 'dotenv';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import LoadablePlugin from '@loadable/webpack-plugin';

config();

const MODE = process.env.NODE_ENV || 'development';

export const clientConfig: Configuration = {
  // @ts-ignore
  mode: MODE,
  devtool: 'inline-source-map',
  entry: {
    index: path.join(__dirname, '..', 'src', 'client', 'index.tsx'),
  },
  output: {
    path: path.join(__dirname, '..', 'dist'),
    publicPath: '/',
    filename: MODE === 'development' ? '[name].js' : '[name].[hash:8].js',
    sourceMapFilename: '[name].[hash:8].map',
    chunkFilename: '[id].[hash:8].js'
  },
  plugins: [
    new LoadablePlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '..', 'src', 'public', 'index.html'),
      inject: true,
      scriptLoading: 'defer',
    }),
    new MiniCssExtractPlugin(
      {
        filename: MODE === 'development' ? '[name].css' : '[name].[hash].css',
      },
    ),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js)$/,
        use: ['babel-loader'],
        resolve: {
          extensions: ['.ts', '.tsx', '.js', '.pcss'],
        },
      },
      {
        test: /\.pcss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: path.resolve(__dirname),
              },
            },
          },
        ],
      },
    ],
  },
};
