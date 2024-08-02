// import globals from 'globals';
// import pluginJs from '@eslint/js';
// import pluginReact from 'eslint-plugin-react';

// export default [
//   { files: ['**/*.{js,mjs,cjs,jsx}'] },
//   { languageOptions: { globals: globals.browser } },
//   pluginJs.configs.recommended,
//   pluginReact.configs.flat.recommended,
// ];

import { FlatCompat } from '@eslint/eslintrc';
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

const compat = new FlatCompat({
  baseDirectory: __dirname,
  resolvePluginsRelativeTo: __dirname,
});

export default [
  ...compat.config({
    extends: [
      'eslint:recommended',
      'airbnb',
      'airbnb/hooks',
      'plugin:react/recommended',
      'plugin:react-hooks/recommended',
      'plugin:jsx-a11y/recommended',
      'plugin:prettier/recommended',
    ],
    plugins: {
      react,
      reactHooks,
      jsxA11y,
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': 'error',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
      'jsx-a11y/anchor-is-valid': 'off',
      'react/button-has-type': 'off',
    },
    env: {
      browser: true,
      es2021: true,
    },
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: 12,
      sourceType: 'module',
    },
  }),
];
