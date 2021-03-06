const webpackConfig = isTypescript => `const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: ["./src/index.${isTypescript ? "t" : "j"}sx"],
  output: {
    path: path.resolve(__dirname, "dist/js"),
    filename: "bundle.js",
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.(${isTypescript ? "tsx|ts|" : ""}js|jsx)$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
                [
                  "@babel/preset-react",
                  {
                    runtime: "automatic"
                  }
                ],
                ${isTypescript ? '"@babel/preset-typescript",' : ""}
              ],
              plugins: ["@babel/plugin-transform-runtime"]
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
  ],
  resolve: {
    extensions: [${
      isTypescript ? '".ts", ".tsx",' : ""
    } ".js", ".jsx", "css", "scss"]
  },
  devtool: "source-map",
  mode: "development",
  devServer: {
    host: "localhost",
    port: 3000,
    historyApiFallback: true,
    open: true,
    hot: true
  }
};
`;

module.exports = webpackConfig;
