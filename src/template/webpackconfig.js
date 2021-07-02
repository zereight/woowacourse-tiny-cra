const tsLoader = `
{
    test: /\.(ts|tsx)$/,
    loader: "ts-loader",
    exclude: /node_modules/
},
`;

const webpackConfig = (isTypescript) => `
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: ["./src/index.${isTypescript ? "t" : "j"}sx"],
  output: {
    path: path.resolve(__dirname, "dist/js"),
    filename: "bundle.js"
  },
  module: {
    rules: [
        ${isTypescript ? tsLoader : ""}
      {
        test: /\.(js|jsx)$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env"
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

module.exports = webpackConfig;
