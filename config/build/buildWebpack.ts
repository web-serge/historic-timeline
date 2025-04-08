import webpack from 'webpack';

import { buildLoaders } from './buildLoaders';
import { buildPlugins } from './buildPlugins';
import { buildResolvers } from './buildResolvers';
import { BuildOptions } from './types/build.types';
import { buildDevServer } from './buildDevServer';

export const buildWebpack = (options: BuildOptions): webpack.Configuration => {
  const { mode, paths } = options;
  const { entry, output } = paths;

  const isDev = mode === 'development';

  return {
    mode,
    entry,
    output: {
      path: output,
      filename: '[name].[contenthash].js',
      clean: true, // отчищает build от лишних файлов
    },
    module: {
      rules: buildLoaders(options),
    },
    resolve: buildResolvers(options),
    plugins: buildPlugins(options),
    devtool: isDev ? 'eval-cheap-module-source-map' : 'source-map',
    devServer: isDev ? buildDevServer(options) : undefined,
  };
};
