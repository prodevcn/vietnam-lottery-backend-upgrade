module.exports = {
  env: {
    commonjs: true,
    node: true,
    es2021: true,
  },
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'no-console': 'error',
  },
  root: true,
}
