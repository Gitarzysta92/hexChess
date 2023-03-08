// Global imports
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

// Paths
const entry = './src/demo-app/app.ts';
const includePath = path.join(__dirname, 'src');
const nodeModulesPath = path.join(__dirname, 'node_modules');

let outputPath = path.join(__dirname, 'dist');
let publicPath = '';

module.exports = env => {
  // Dev environment
  let devtool = 'inline-source-map';
  let mode = 'development';
  let stats = 'minimal';
  let plugins = [
    new webpack.DefinePlugin({
      __ENV__: JSON.stringify(env.NODE_ENV)
    })
  ];

  console.log('Webpack build -');
  console.log(`    - ENV: ${env.NODE_ENV}`);
  console.log(`    - outputPath  ${outputPath}`);
  console.log(`    - includePath ${includePath}`);
  console.log(`    - nodeModulesPath: ${nodeModulesPath}`);

  return {
    mode,
    entry: [ entry ],
    output: {
      path: outputPath,
      publicPath,
      filename: '[name].bundle.js',
      chunkFilename: '[name].bundle.js',
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          include: includePath,
          exclude: nodeModulesPath,
        },
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader",],
        },
        {
          test: /\.(glsl)$/,
          exclude: /node_modules/,
          use: [{
            loader: 'shader-loader',
          }]
        }
      ]
    },
    resolve: {
      modules: [
        'node_modules',
        path.resolve(__dirname, 'src')
      ],
      extensions: ['.tsx', '.ts', '.js'],
    },
    performance: {
      //hints: 'warning'
    },
    stats,
    devtool,
    devServer: {
      static: 'src/demo-app/assets',
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Three.js Webpack ES6 Boilerplate',
        template: path.join(__dirname, 'src/demo-app/index.html'),
      }),
      new CopyPlugin({
        patterns: [
          { from: "./src/lib/shaders", to: "./lib/shaders" },
        ],
      }),
      // new MiniCssExtractPlugin({
      //   filename: '../css/[name].css',
      //   chunkFilename: '../css/[id].css'
      // })
    ],
    resolveLoader: {
      alias: {
        'shader-loader': require('path').resolve('./shader-loader'),
      }
    }
  };
};