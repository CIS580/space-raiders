const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      }
    ]
  },
  entry: './src/index.js',
  mode: 'development',
    // Change mode to 'production' for minification and better performance.
    // 'development' mode allows easier debugging in browser (shows actual function names).
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.resolve(__dirname, "./dist"),
    watchContentBase: true
  }
};
