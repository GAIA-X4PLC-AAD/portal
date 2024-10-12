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
      'consistent-as-needed'
    ],
    'react/react-in-jsx-scope': 'warn',
    'react/jsx-uses-react': 'warn',
    'import/order': ['error', {
      'groups': ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
      'newlines-between': 'always',
      'alphabetize': {
        order: 'asc',
        caseInsensitive: false
      }
    }],
    'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1, maxBOF: 0 }],
    'indent': ['error', 2],
    'keyword-spacing': ['error', { before: true, after: true }],
    'curly': ['error', 'all'],
    'no-trailing-spaces': ['error'],
    'quotes': ['error', 'single'],
    'object-curly-spacing': ['error', 'always'],
    'eol-last': ['error', 'always'],
    'no-throw-literal': 'off',
    'react-hooks/exhaustive-deps': 'off',
  },
  overrides: [
    {
      files: ['*.test.js', '*.test.jsx', '*.test.ts', '*.test.tsx'],
      rules: { '@typescript-eslint/no-unused-expressions': 'off' }
    }
  ],
  extends: [
    'react-app',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/eslint-recommended'
  ]
}
