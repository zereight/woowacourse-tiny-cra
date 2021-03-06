const eslintrc = `{
    "env": {
      "browser": true,
      "es2021": true
    },
    "extends": [
      "airbnb-base",
      "plugin:react/recommended",
      "plugin:@typescript-eslint/recommended",
      "prettier/@typescript-eslint",
      "plugin:prettier/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
      "ecmaVersion": 2018,
      "sourceType": "module",
      "ecmaFeatures": {
        "jsx": true
      }
    },
    "plugins": ["react", "@typescript-eslint", "prettier"],
    "rules": {},
    "ignorePatterns": ["webpack.config.js", ".eslintrc.js"],
    "settings": {
      "react": {
        "version": "detect"
      }
    }
  }
  `;

module.exports = eslintrc;
