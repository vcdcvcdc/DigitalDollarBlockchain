const path = require("path");

module.exports = {
  entry: "./js/WW.js", // Specify the entry point of your code
  output: {
    filename: "bundle.js", // Specify the output filename
    path: path.resolve(__dirname, "dist"), // Specify the output directory
  },
};
