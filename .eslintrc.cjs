module.exports = {
  env: {
    browser: false,
    commonjs: true,
    es2021: true,
  },
  extends: ["airbnb-base", "eslint-config-prettier"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
  },
  plugins: ["@typescript-eslint"],
  rules: {
    "no-console": "off",
    "import/extensions": 0
  },
  settings: {
    'import/extensions': 0,
    'import/resolver': {
        'node': {
            'paths': ['src'],
            'extensions': ['.js', '.ts', '.d.ts', '.tsx']
        }
    },
  }
};
