module.exports = {
  presets: [
    ['@babel/preset-react'],
    '@babel/preset-typescript',
    [
      '@babel/preset-env',
      {
        modules: false,
        loose: true,
      },
    ],
  ],
  plugins: [
    [
      '@babel/plugin-transform-runtime',
      {
        absoluteRuntime: false,
        helpers: true,
        regenerator: true,
        useESModules: false,
      },
    ],
  ],
};
