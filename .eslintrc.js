module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    es6: true,
    mocha: true,
    node: true,
    jest: true
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    sourceType: 'module'
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'import'
  ],
  settings: {
    react: {
      version: 'detect'
    }
  },
  rules: {
    'quote-props': [
      'warn',
      'as-needed'
    ],
    'no-const-assign': 'warn',
    'no-this-before-super': 'warn',
    'no-undef': 'warn',
    'no-unreachable': 'warn',
    'no-unused-vars': 'off',
    'constructor-super': 'warn',
    'valid-typeof': 'warn',
    'react/display-name': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-uses-react': 'error',
    'import/order': ['error', {
      groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
      'newlines-between': 'always',
      alphabetize: {
        order: 'asc',
        caseInsensitive: false
      }
    }],
    'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1, maxBOF: 0 }],
    indent: ['error', 2],
    'keyword-spacing': ['error', { before: true, after: true }],
    curly: ['error', 'all'],
    'no-trailing-spaces': ['error'],
    quotes: ['error', 'single'],
    'object-curly-spacing': ['error', 'always'],
    'eol-last': [
      'error',
      'always'
    ],
    'no-throw-literal': 'off',
    '@typescript-eslint/no-unused-expressions': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'import/no-named-as-default': 'off',
    'import/no-anonymous-default-export': 'off'
  },
  extends: [
    'react-app',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/eslint-recommended'
  ]
}
