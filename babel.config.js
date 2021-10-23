module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            components: './src/components',
            constants: './src/constants',
            services: './src/services',
            providers: './src/providers',
            navigate: './src/navigate',
            pages: './src/pages',
          },
        },
      ],
    ],
  };
};
