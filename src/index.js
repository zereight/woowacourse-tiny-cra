const fs = require("fs");

const babelrc = require("./template/babelrc");
const eslintrc = require("./template/eslintrc");
const prettierrc = require("./template/prettierrc");
const gitignore = require("./template/gitignore");
const tsconfig = require("./template/tsconfig");
const typeDts = require("./template/type.d.ts.js");
const webpackConfig = require("./template/webpackconfig");

const htmlTemplate = `<!DOCTYPE html>
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

const babelInstallList = [
  "@babel/cli",
  "@babel/core",
  "@babel/preset-env",
  "@babel/preset-react",
  "@babel/plugin-transform-runtime",
];

const typescriptInstallList = [
  "typescript",
  "@types/react",
  "@types/react-dom",
  "@typescript-eslint/eslint-plugin",
  "@typescript-eslint/parser",
  "@types/styled-components",
  "@babel/preset-typescript",
];

const webpackInstallList = [
  "webpack",
  "webpack-cli",
  "webpack-dev-server",
  "babel-loader",
  "clean-webpack-plugin",
  "html-webpack-plugin",
];

const reactInstallList = ["react", "react-dom"];

const eslintPrettierInstallList = [
  "eslint",
  "prettier",
  "eslint-config-airbnb-base",
  "eslint-config-prettier",
  "eslint-plugin-import",
  "eslint-plugin-prettier",
  "eslint-plugin-react",
];

const styledComponentInstallList = ["styled-components"];

const PACKAGE_JSON = ({ name }) => `{
    "name": "${name}",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "repository": "",
    "author": "",
    "license": "MIT",
    "devDependencies": {
      
    },
    "dependencies": {
      
    },
    "scripts": {
      "start": "webpack serve",
      "build": "webpack"
    }
  }`;

const appTemplate = `const App = () => {
  return <h1>Hello World</h1>;
};

export default App;
`;

const indexTemplate = `import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.querySelector("#root")
);`;

const execSync = function (cmg) {
  require("child_process").execSync(cmg).toString().trim();
};

const run = () => {
  const projectFolderName = process.argv[2];
  const isTypescript = process.argv[3] === "typescript";

  execSync(`mkdir ${projectFolderName}`);

  const execSyncInApp = function (cmd) {
    execSync(`cd ${projectFolderName} && ${cmd}`);
  };

  fs.writeFileSync(
    `${projectFolderName}/package.json`,
    PACKAGE_JSON({ name: projectFolderName })
  );

  fs.writeFileSync(`${projectFolderName}/.babelrc`, babelrc);
  fs.writeFileSync(`${projectFolderName}/.eslintrc`, eslintrc);
  fs.writeFileSync(`${projectFolderName}/.prettierrc`, prettierrc);
  fs.writeFileSync(`${projectFolderName}/.gitignore`, gitignore);

  fs.writeFileSync(
    `${projectFolderName}/webpack.config.js`,
    webpackConfig(isTypescript)
  );

  execSyncInApp("mkdir public");
  execSyncInApp("mkdir src");
  fs.writeFileSync(`${projectFolderName}/public/index.html`, htmlTemplate);

  execSyncInApp(`yarn add -D ${babelInstallList.join(" ")}`);
  execSyncInApp(`yarn add -D ${webpackInstallList.join(" ")}`);
  execSyncInApp(`yarn add -D ${eslintPrettierInstallList.join(" ")}`);

  if (isTypescript) {
    execSyncInApp(`yarn add -D ${typescriptInstallList.join(" ")}`);

    fs.writeFileSync(`${projectFolderName}/tsconfig.json`, tsconfig);
    fs.writeFileSync(`${projectFolderName}/type.d.ts`, typeDts);
  }
  fs.writeFileSync(
    `${projectFolderName}/src/App.${isTypescript ? "t" : "j"}sx`,
    appTemplate
  );
  fs.writeFileSync(
    `${projectFolderName}/src/index.${isTypescript ? "t" : "j"}sx`,
    indexTemplate
  );

  execSyncInApp(`yarn add  ${reactInstallList.join(" ")}`);
  execSyncInApp(`yarn add  ${styledComponentInstallList.join(" ")}`);
};

run();
