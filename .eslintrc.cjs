module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended', // must be the last one
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.app.json',
    tsconfigRootDir: __dirname,
  },
  plugins: ['@typescript-eslint', 'react', 'react-refresh', 'prettier'],
  rules: {
    'react/function-component-definition': 'off',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'react/react-in-jsx-scope': 0,
    'react/jsx-filename-extension': [
      2,
      { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
    ],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'import/no-absolute-path': 0,
    'react/jsx-props-no-spreading': 0,
    'jsx-a11y/label-has-associated-control': [2, { assert: 'either' }],
    'linebreak-style': 0,
    'no-restricted-imports': 0,
    'react/require-default-props': 0,
    // Cette ligne permet de ne pas avoir d'erreur dans Button.tsx
    // "The button type attribute must be specified by a static string or a trivial ternary expressioneslintreact/button-has-type"
    'react/button-has-type': 'off',
  },
  // Ces deux lignes permettent de ne pas avoir d'erreur de type multation dans dossier features car on utilise immer de react toolkit
  overrides: [
    {
      files: ['src/**/features/**/*.ts'],
      rules: { 'no-param-reassign': ['error', { props: false }] },
    },
  ],
};
