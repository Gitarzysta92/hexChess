// Global imports
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

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
    //context: path.resolve(__dirname, "src"),
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
      static: 'dist',
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Three.js Webpack ES6 Boilerplate',
        template: path.join(__dirname, 'src/demo-app/index.html'),
      }),
      new CopyWebpackPlugin({
        patterns: [
            { from: 'src/demo-app/static', to: 'assets' }
        ]
      })
      // new MiniCssExtractPlugin({
      //   filename: '../css/[name].css',
      //   chunkFilename: '../css/[id].css'
      // })
    ]
  };
};