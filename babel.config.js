module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            components: './src/components',
            navigate: './src/navigate',
            pages: './src/pages',
          },
        },
      ],
    ],
  };
};
