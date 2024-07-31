module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    // 'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
    // 'prettier',
  ],
  rules: {
    // 'prettier/prettier': 'error',
    'react/react-in-jsx-scope': 'off', // React 17+에서 JSX 변환을 사용할 때 이 규칙을 비활성화합니다.
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
