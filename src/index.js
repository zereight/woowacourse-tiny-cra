const fs = require("fs");

const BEBEL_CONFIG = `{"presets": ["@babel/preset-env"]}`;
const ESLINT_CONFIG = `{
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
const GITIGNORE_CONFIG = "node_modules";
const PRETTIER_CONFIG = `{
    "arrowParens": "avoid",
    "bracketSpacing": true,
    "htmlWhitespaceSensitivity": "css",
    "insertPragma": false,
    "jsxBracketSameLine": false,
    "jsxSingleQuote": false,
    "printWidth": 80,
    "proseWrap": "preserve",
    "quoteProps": "as-needed",
    "requirePragma": false,
    "semi": true,
    "singleQuote": false,
    "tabWidth": 2,
    "trailingComma": "none",
    "useTabs": false,
    "vueIndentScriptAndStyle": false
  }
  `;

const TS_CONFIG = `{
    "compilerOptions": {
      /* Basic Options */
      "target": "es5",
      "module": "esnext",
      "allowJs": true,
      "jsx": "react-jsx",
      "sourceMap": true,
      "outDir": "./build",
  
      /* Strict Type-Checking Options */
      "strict": true,
  
      /* Module Resolution Options */
      "moduleResolution": "node",
      "esModuleInterop": true,
  
      /* Advanced Options */
      "skipLibCheck": true,
      "forceConsistentCasingInFileNames": true,
  
      "noImplicitAny": true, // any를 막는다.
      "strictNullChecks": true, // 모든 타입에 자동으로 포함되어 있는 null, undefined 제거
      "noImplicitReturns": true // 모든 코드가 값을 리턴하지 않으면 에러
    },
    "include": ["./src/**/*"]
  }
  `;
const WEBPACK_CONFIG = `const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: ["./src/index.tsx"],
  output: {
    path: path.resolve(__dirname, "dist/js"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.(js|jsx)$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    useBuiltIns: "usage",
                    corejs: "3.6.4",
                    targets: {
                      chrome: "87"
                    }
                  }
                ],
                "@babel/preset-react"
              ]
            }
          }
        ],
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html"
    }),
    new CleanWebpackPlugin()
  ],
  resolve: {
    extensions: ["", ".ts", ".tsx", ".js", ".jsx", "css", "scss"]
  },
  devtool: "source-map",
  mode: "development"
};
`;

const HTML_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
`;

const PACKAGE_JSON = `{
    "name": "",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "repository": "",
    "author": "",
    "license": "MIT",
    "devDependencies": {
      "@babel/cli": "^7.14.5",
      "@babel/core": "^7.14.6",
      "@babel/preset-env": "^7.14.7",
      "@babel/preset-react": "^7.14.5",
      "@types/styled-components": "^5.1.10",
      "@typescript-eslint/eslint-plugin": "^4.28.0",
      "@typescript-eslint/parser": "^4.28.0",
      "babel-loader": "8.2.2",
      "clean-webpack-plugin": "^4.0.0-alpha.0",
      "eslint": "^7.29.0",
      "eslint-config-airbnb-base": "^14.2.1",
      "eslint-config-prettier": "^8.3.0",
      "eslint-plugin-import": "^2.23.4",
      "eslint-plugin-prettier": "^3.4.0",
      "eslint-plugin-react": "^7.24.0",
      "html-webpack-plugin": "^5.3.2",
      "prettier": "^2.3.2",
      "ts-loader": "^9.2.3",
      "typescript": "^4.3.4",
      "webpack": "^5.40.0",
      "webpack-cli": "^4.7.2",
      "webpack-dev-server": "^3.11.2"
    },
    "dependencies": {
      "@types/react": "^17.0.11",
      "@types/react-dom": "^17.0.8",
      "react": "^17.0.2",
      "react-dom": "^17.0.2",
      "styled-component": "^2.8.0"
    },
    "scripts": {
      "start": "webpack serve",
      "build": "webpack"
    }
  }`;

const APP_JSX_INIT = `const App = () => {
    return <h1>Hello World</h1>;
  };
  
  export default App;`;

const INDEX_JSX_INIT = `
  import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.querySelector("#root")
);`;

const execSync = (cmg) =>
  require("child_process").execSync(cmg).toString().trim();

const run = () => {
  const projectFolderName = process.argv[2];
  execSync(`mkdir ${projectFolderName}`);

  const execSyncInApp = (cmd) => execSync(`cd ${projectFolderName} && ${cmd}`);

  fs.writeFileSync(`${projectFolderName}/package.json`, PACKAGE_JSON);

  fs.writeFileSync(`${projectFolderName}/.babelrc`, BEBEL_CONFIG);
  fs.writeFileSync(`${projectFolderName}/.eslintrc`, ESLINT_CONFIG);
  fs.writeFileSync(`${projectFolderName}/.prettierrc`, PRETTIER_CONFIG);
  fs.writeFileSync(`${projectFolderName}/.gitignore`, GITIGNORE_CONFIG);

  fs.writeFileSync(`${projectFolderName}/tsconfig.json`, TS_CONFIG);
  fs.writeFileSync(`${projectFolderName}/webpack.config.js`, WEBPACK_CONFIG);

  execSyncInApp("mkdir public");
  execSyncInApp("mkdir src");
  fs.writeFileSync(`${projectFolderName}/public/index.html`, HTML_TEMPLATE);
  fs.writeFileSync(`${projectFolderName}/src/App.tsx`, APP_JSX_INIT);
  fs.writeFileSync(`${projectFolderName}/src/index.tsx`, INDEX_JSX_INIT);

  execSyncInApp(`yarn`);
};

run();
