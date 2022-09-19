const path = require('path');

module.exports = {
  extends: ['plugin:prettier/recommended', 'plugin:import/recommended'],
  plugins: ['prettier', '@emotion', 'react-hooks'],
  rules: {
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    '@emotion/syntax-preference': [2, 'string'],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/jsx-props-no-spreading': 'off',
    'react/react-in-jsx-scope': 'off',
    'no-var': 0,
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        mjs: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
  },
  overrides: [
    {
      files: ['**/*.ts?(x)'],
      parser: '@typescript-eslint/parser',
      extends: ['plugin:@typescript-eslint/recommended'],
      rules: {
        'react/prop-types': 'off',
        'react/require-default-props': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        'no-use-before-define': 'off',
        '@typescript-eslint/no-use-before-define': ['error', { variables: false }],
      },
    },
    {
      files: ['services/ui/**/*.ts?(x)'],
      settings: {
        'import/resolver': {
          typescript: {
            project: path.resolve(`${__dirname}/services/ui/tsconfig.json`),
          },
        },
      },
    },
    {
      files: ['services/main/**/*.ts?(x)'],
      settings: {
        'import/resolver': {
          typescript: {
            project: path.resolve(`${__dirname}/services/main/tsconfig.json`),
          },
        },
      },
    },
  ],
  settings: {
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx', 'spec.js'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx', '.d.ts', '.js', '.jsx'],
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
  env: {
    browser: true,
  },
};
