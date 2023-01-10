module.exports = {
  // https://eslint.org/docs/user-guide/configuring#configuration-cascading-and-hierarchy
  // This option interrupts the configuration hierarchy at this file
  // Remove this if you have an higher level ESLint config file (it usually happens into a monorepos)
  root: true,

  parser: 'vue-eslint-parser',

  parserOptions: {
    ecmaVersion: '2021', // Allows for the parsing of modern ECMAScript features
  },


  env: {
    node: true,
    browser: true,
    'vue/setup-compiler-macros': true
  },

  // Rules order is important, please avoid shuffling them
  extends: [
    // Base ESLint recommended rules
    // 'eslint:recommended',

    // Uncomment any of the lines below to choose desired strictness,
    // but leave only one uncommented!
    // See https://eslint.vuejs.org/rules/#available-rules
    // 'plugin:vue/vue3-essential', // Priority A: Essential (Error Prevention)
    // 'plugin:vue/vue3-strongly-recommended', // Priority B: Strongly Recommended (Improving Readability)
    'plugin:vue/vue3-recommended', // Priority C: Recommended (Minimizing Arbitrary Choices and Cognitive Overhead)

    'standard',


  ],

  plugins: [
    // https://eslint.vuejs.org/user-guide/#why-doesn-t-it-work-on-vue-files
    // required to lint *.vue files
    'vue',

  ],

  globals: {
    ga: 'readonly', // Google Analytics
    cordova: 'readonly',
    __statics: 'readonly',
    __QUASAR_SSR__: 'readonly',
    __QUASAR_SSR_SERVER__: 'readonly',
    __QUASAR_SSR_CLIENT__: 'readonly',
    __QUASAR_SSR_PWA__: 'readonly',
    process: 'readonly',
    Capacitor: 'readonly',
    chrome: 'readonly'
  },

  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': [0],

    'no-unused-vars': ['error', {
      varsIgnorePattern: '(?<!\w)$props|props|emit(?!\w)|^_', // eslint-disable-line
      args: 'none',
      caughtErrors: 'none',
      ignoreRestSiblings: true
    }],

    // allow paren-less arrow functions
    'arrow-parens': [0],
    'one-var': [0],
    'no-void': [0],
    'multiline-ternary': [0],

    'import/first': [0],
    'import/named': [2],
    'import/namespace': [2],
    'import/default': [2],
    'import/export': [2],
    'import/extensions': [0],
    'import/no-unresolved': [0],
    'import/no-extraneous-dependencies': [0],

    'prefer-promise-reject-errors': [0],

    // allow debugger during development only
    'no-debugger': process.env.NODE_ENV === 'production' ? [2] : [0],

    'vue/script-setup-uses-vars': [2],
    'vue/multi-word-component-names': [0],
    'vue/valid-template-root': [0]
  }
}
