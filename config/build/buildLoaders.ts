import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { ModuleOptions } from 'webpack';

import { BuildOptions } from './types/build.types';
import { buildBabelLoader } from './babel/buildBabelLoader';

export const buildLoaders = (options: BuildOptions): ModuleOptions['rules'] => {
  const { mode } = options;

  const isDev = mode === 'development';

  const postCssLoader = {
    loader: 'postcss-loader',
    options: {
      postcssOptions: {
        plugins: [
          [
            'autoprefixer',
            {
              // Options
            },
          ],
        ],
      },
    },
  };

  // Лоадер для обычных CSS/SCSS файлов с поддержкой CSS Modules
  const cssLoaderWithModules = {
    loader: 'css-loader',
    options: {
      modules: {
        namedExport: false,
        exportLocalsConvention: 'as-is',
        localIdentName: isDev ? '[path][name]_[local]' : '[hash:base64:8]',
      },
    },
  };

  // Лоадер для глобальных стилей, где CSS Modules отключен
  const cssLoaderWithoutModules = {
    loader: 'css-loader',
    options: {
      modules: false, // Отключаем CSS Modules для глобальных стилей
    },
  };

  // Правило для файлов, которые содержат `.global.css`
  const globalStylesLoader = {
    test: /\.global\.css$/i,
    use: [
      isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
      cssLoaderWithoutModules,
      postCssLoader,
      'sass-loader',
    ],
  };

  // Правило для остальных стилей, где CSS Modules включён
  const scssLoader = {
    test: /\.(s[ac]|c)ss$/i,
    exclude: /\.global\.css$/, // Исключаем глобальные стили
    use: [
      isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
      cssLoaderWithModules,
      postCssLoader,
      'sass-loader',
    ],
  };

  const babelLoader = buildBabelLoader(options);

  // Для поддержки ассетов
  const assetsLoader = {
    test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf)$/i,
    type: 'asset/resource',
  };

  // Для преобразования svg в React-компоненты
  const svgrLoader = {
    test: /\.svg$/i,
    use: [
      {
        loader: '@svgr/webpack',
        options: {
          icon: true,
          svgoConfig: {
            plugins: [{ name: 'convertColors', params: { currentColor: true } }],
          },
        },
      },
    ],
  };

  // Возвращаем все правила
  return [globalStylesLoader, scssLoader, assetsLoader, babelLoader, svgrLoader];
};
