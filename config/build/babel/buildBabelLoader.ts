import { BuildOptions } from '../types/build.types';
import { removeDataTestIdBabelPlugin } from './removeDataTestIdBabelPlugin';

export const buildBabelLoader = (options: BuildOptions) => {
  const { mode } = options;

  const isProd = mode === 'production';

  const plugins = [];

  if (isProd) {
    plugins.push(
      // удаляет указанные теги во всех html элементах
      [removeDataTestIdBabelPlugin, { props: 'data-testid' }],
    );
  }

  return {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        // можно вынести в babel.config.json
        presets: [
          '@babel/preset-env',
          '@babel/preset-typescript',
          ['@babel/preset-react', { runtime: 'automatic' }],
        ],
        plugins: plugins.length > 0 ? plugins : undefined,
      },
    },
  };
};
