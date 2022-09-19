// import '!style-loader!css-loader!sass-loader!../src/assets/App.scss';
// import '!style-loader!css-loader!sass-loader!../src/assets/style.scss';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
