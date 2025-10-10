module.exports = {
  extends: ['next/core-web-vitals'],
  rules: {
    'prefer-const': 'error',
    'no-unused-vars': 'warn',
    'react-hooks/exhaustive-deps': 'warn',
    'react/no-unescaped-entities': 'off',
    'react/display-name': 'off',
    'no-restricted-syntax': 'off',
  },
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
};
