module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['module-resolver', {
      alias: {
        components: './src/components',
        constantes: './src/constantes',
        services: './src/services',
        providers: './src/providers',
        navigate: './src/navigate',
        pages: './src/pages',
      },
      cwd: 'babelrc',
    }],
    ['module:react-native-dotenv', {
      envName: 'APP_ENV',
      moduleName: '@env',
      path: '.env',
      safe: false,
      allowUndefined: true,
      verbose: false,
    }],
  ],
};
