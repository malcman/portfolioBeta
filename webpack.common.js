const path = require('path');

module.exports = {
  entry: './milkman/react/main.jsx',
  output: {
    path: path.join(__dirname, '/milkman/static/js/'),
    filename: 'bundle.js',
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      use: ['babel-loader'],
      exclude: /node_modules/,
    }],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
