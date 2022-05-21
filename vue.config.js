const { defineConfig } = require('@vue/cli-service')
const webpack = require('webpack')
const Dotenv = require('dotenv-webpack');

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        Buffer: ['buffer', 'Buffer'],
      }),
      new Dotenv()
    ],
    resolve: {
      fallback: {
          stream: require.resolve('stream-browserify'),
          https: require.resolve('https-browserify'),
          os: require.resolve('os-browserify/browser'),
          http: require.resolve('stream-http'),
          buffer: require.resolve('buffer'),
          path: require.resolve("path-browserify"),
          fs: require.resolve("fs"),
      },
    },
  }
})
