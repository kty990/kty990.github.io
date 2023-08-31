module.exports = {
    entry: './src/js/site.jsx',
    output: {
      filename: 'site_bundle.js',
      path: __dirname + '/src/dist/', // Create a 'dist' directory to store bundled files
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
      ],
    }
  };