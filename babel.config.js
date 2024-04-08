module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
          alias: {
            '@dtos': './src/dtos',
            '@assets': './src/assets',
            '@components': './src/views/components',
            '@view-models': './src/view-models',
            '@screens': './src/views/screens',
            '@storage': './src/infra/storage',
            '@utils': './src/utils',
            '@services': './src/services',
            '@theme': './src/theme',
            '@hooks': './src/hooks',
            '@contexts': './src/contexts',
            '@routes': './src/routes',
            '@mappers': './src/mappers',
            '@__tests__': './src/__tests__',
          },
        },
      ],
    ],
  };
};
