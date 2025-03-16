const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "production",
  entry: {
    content: "./src/content.js",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    fallback: {
      path: require.resolve("path-browserify"), // Add this line to resolve 'path'
    },
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: "src/manifest.json", to: "manifest.json" },
        { from: "src/styles.css", to: "styles.css" },
        { from: "node_modules/kuromoji/dict/", to: "dict/" }, // Ensure the dictionary is copied
      ],
    }),
  ],
};
