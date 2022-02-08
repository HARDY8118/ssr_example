const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  entry: ["regenerator-runtime/runtime.js", "./server.js"],
  target: "node",

  externals: [nodeExternals()],
  output: {
    path: path.resolve("build"),
    filename: "server.js",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: "babel-loader",
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
};
