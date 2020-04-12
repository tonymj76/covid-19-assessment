module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true
  },

  extends: [
    'airbnb-base', 'plugin:vue/vue3-recommended',
  ],

  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },

  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },

  rules: {
    'comma-dangle': [
      'error',
      'never'
    ],
    'no-param-reassign': [
      'error',
      {
        props: false
      }
    ],
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  },

  root: true,

  'extends': [
    'airbnb-base',
    'plugin:vue/vue3-recommended',
    'plugin:vue/essential',
    '@vue/airbnb'
  ]
};
