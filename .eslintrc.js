module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  extends: [
    "plugin:vue/essential",
    "@vue/standard"
  ],
  env: {
    browser: true,
  },
  // custom rules here
  rules: {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    // beware of returning assignement
    'no-return-assign': 'off',
    'no-extend-native': 'warn',
    'no-tabs': 'off'
  }
}