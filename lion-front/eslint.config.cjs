// const { FlatCompat } = require('@eslint/eslintrc');
// const { fileURLToPath } = require('url');
// const { dirname } = require('path');
// const airbnb = require('eslint-config-airbnb');
// const airbnbHooks = require('eslint-config-airbnb/hooks');
// const prettier = require('eslint-config-prettier');
// const react = require('eslint-plugin-react');
// const reactHooks = require('eslint-plugin-react-hooks');
// const jsxA11y = require('eslint-plugin-jsx-a11y');
// const prettierPlugin = require('eslint-plugin-prettier');

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// const compat = new FlatCompat({
//   baseDirectory: __dirname,
//   resolvePluginsRelativeTo: __dirname,
// });

// module.exports = [
//   ...compat.config({
//     extends: [
//       'eslint:recommended',
//       'airbnb',
//       'airbnb/hooks',
//       'plugin:react/recommended',
//       'plugin:react-hooks/recommended',
//       'plugin:jsx-a11y/recommended',
//       'plugin:prettier/recommended',
//     ],
//     plugins: {
//       react,
//       reactHooks,
//       jsxA11y,
//       prettier: prettierPlugin,
//     },
//     rules: {
//       'prettier/prettier': 'error',
//       'react/react-in-jsx-scope': 'off',
//       'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
//       'jsx-a11y/anchor-is-valid': 'off',
//       'react/button-has-type': 'off',
//     },
//     env: {
//       browser: true,
//       es2021: true,
//     },
//     parserOptions: {
//       ecmaFeatures: {
//         jsx: true,
//       },
//       ecmaVersion: 12,
//       sourceType: 'module',
//     },
//   }),
// ];
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import airbnb from 'eslint-config-airbnb';
import airbnbHooks from 'eslint-config-airbnb/hooks';
import prettier from 'eslint-config-prettier';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import prettierPlugin from 'eslint-plugin-prettier';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default [
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 12,
      sourceType: "module",
      ecmaFeatures: {
        jsx: true,
      },
    },
    plugins: {
      react,
      reactHooks,
      jsxA11y,
      prettier: prettierPlugin,
    },
    rules: {
      "prettier/prettier": "error",
      "react/react-in-jsx-scope": "off",
      "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
      "jsx-a11y/anchor-is-valid": "off",
      "react/button-has-type": "off",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    env: {
      browser: true,
      es2021: true,
    },
  },
  ...airbnb,
  ...airbnbHooks,
  ...prettier,
];
