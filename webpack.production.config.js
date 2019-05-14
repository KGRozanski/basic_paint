const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;

const path = require('path');
const fs = require('fs');


// Our function that generates our html plugins
function generateHtmlPlugins(templateDir) {
  // Read files in template directory
  const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir));
  return templateFiles.map(item => {
    // Split names and extension
    const parts = item.split('.');
    const name = parts[0];
    const extension = parts[1];

    function getChunks() {
      switch(name) {
        case 'index':
        return ['main', 'style', 'vendors', 'shared', 'orderForm'];
        case 'dont-leave':
        return ['dontLeave', 'style', 'vendors'];
        case 'correction':
        return ['style', 'correction', 'vendors'];
        case 'thanks':
        return ['style', 'thanks', 'vendors'];
        case 'shipping-form':
        return ['style', 'orderForm','vendors'];
        default:
        return ['main', 'style', 'vendors'];
      }
    }

    // Create new HTMLWebpackPlugin with options
    return new HtmlWebpackPlugin({
      filename: `${name}.html`,
      template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`),
      chunks: getChunks()
    });
  })
}

// Make array of HtmlWebpackPlugin instances for all of .html files in templates dir
// to make multiple websites work as well
const htmlPlugins = generateHtmlPlugins('./src/templates');

module.exports = {
  entry: {
    main: './src/assets/js/app.js',
    dontLeave: './src/assets/js/dont-leave.js',
    style: './src/assets/js/style.js',
    correction: './src/assets/js/correction.page.js',
    thanks: './src/assets/js/thanks.page.js',
    shared: './src/assets/js/shared.js',
    orderForm: './src/assets/js/orderForm.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "[name].[hash].chunk.js"
  },
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 500000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          enforce: true,
          chunks: 'all'
        },
        main: {
          name: 'main',
          test: /\.css$/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  },
  module: {
    rules: [{
        test: /\.html$/,
        use: [{
          loader: 'html-loader'
        }]
      },
      {
        test: /\.js$/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }]
      },
      {
        test: /\.(scss|css)/,
        use: [
            MiniCssExtractPlugin.loader,
            "css-loader", // translates CSS into CommonJS
            "sass-loader", // compiles Sass to CSS, using Node Sass by default
        ]
      },
      {
        test: /\.(jpg|png|gif|ico|svg)/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'img/',
            publicPath: 'img/'
          }
        }
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      favicon: 'src/assets/img/favicon.ico'
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css',
    }),
    new CopyWebpackPlugin([{
      from: 'src/assets/img/popup_comments',
      to: 'img'
    }]),
    new CleanWebpackPlugin(),
    new ImageminPlugin({
      pngquant: {
        quality: '50-75'
      }
    })
  ].concat(htmlPlugins)
};
