import path from 'path';

import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import webpack, { Configuration } from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

import { BuildOptions } from './types/build.types';

export const buildPlugins = (
  options: BuildOptions,
): Configuration['plugins'] => {
  const { mode, paths } = options;

  const isDev = mode === 'development';
  const isProd = mode === 'production';

  const plugins: Configuration['plugins'] = [
    // Для работы с html
    new HtmlWebpackPlugin({
      template: paths.html,
      favicon: path.resolve(paths.public, 'favicon.ico'),
    }),
  ];

  if (isDev) {
    // Прогресс по сборке
    plugins.push(new webpack.ProgressPlugin());

    // Выносит процесс проверки типов в отдельный поток, не нагружая сборку
    plugins.push(new ForkTsCheckerWebpackPlugin());

    // Добавляет поддержку hot-module-replacement для React
    plugins.push(new ReactRefreshWebpackPlugin());
  }

  if (isProd) {
    // Выносит CSS в отдельный файл при сборке
    plugins.push(
      new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash:8].css',
        chunkFilename: 'css/[name].[contenthash:8].css',
      }),
    );
  }

  if (options.bundleAnalyze) {
    // Анализ размера бандла сборки
    plugins.push(new BundleAnalyzerPlugin());
  }

  return plugins;
};
