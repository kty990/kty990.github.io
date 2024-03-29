module.exports = {
    entry: './content/jsx/site.jsx',
    mode: "development",
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".jsx"]
    },
    output: {
      filename: 'site_bundle.js',
      path: __dirname + '/content/dist/', // Create a 'dist' directory to store bundled files
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          // exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
      ],
    }
  };