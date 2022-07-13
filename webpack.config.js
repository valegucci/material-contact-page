var path = require("path"),
  autoprefixer = require('autoprefixer'),
  MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = [{
  mode: "production",
  entry: './scss/app.scss',
  plugins: [new MiniCssExtractPlugin()],
  output: {
    // This is necessary for webpack to compile
    // But we never use style-bundle.js
    filename: 'style-bundle.js',
    path: path.join(__dirname, "public"),
  },
  module: {
    rules: [
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]'
            }
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'bundle.css',
            },
          },
          {
            loader: "extract-loader",
            options: {
              publicPath: path.join(__dirname, "public"),
            }
          },
          {
            loader: 'css-loader',
            options: {
              url: false
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  autoprefixer()
                ]
              }
            }
          },
          {
            loader: 'sass-loader',
            options: {
              // Prefer Dart Sass
              implementation: require('sass'),

              // See https://github.com/webpack-contrib/sass-loader/issues/804
              webpackImporter: false,
              sassOptions: {
                includePaths: ['./node_modules']
              },
            }
          }
        ]
      }
    ]
  },
}];