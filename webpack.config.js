const webpack = require("webpack");

module.exports = {
    entry: "./js/main.js",
    resolve: {
        modulesDirectories: [
            "./js"
        ]
    },
    loader: 'babel-loader',
    module: {
        loaders: [
          {
              //test: /.jsx?$/,
              loader: 'babel-loader',
              exclude: 'node_modules',
              query: {
                  presets: ['es2015']
              }
          }
        ]
    },
    output: {
        publicPath: "./js",
        filename: "./js/bundle.js"
    }
};


