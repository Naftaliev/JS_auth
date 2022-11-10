const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


let mode = 'development'
if (process.env.NODE_ENV === 'production') {
    mode = 'production'
}
console.log(mode + ' mode')

module.exports = {
  mode: mode, 
  entry: {
    main: path.resolve(__dirname, 'src/index.js'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    assetModuleFilename: "assets/[hash][ext]",
    clean: true,
  },
  devtool: 'inline-source-map',
  devServer: {
    compress: true,
    port: 9000,
    //open: 'C:\Program Files\Firefox Developer Edition\firefox.exe'
  },
  resolve: {
    alias: {
      _src: path.resolve(__dirname, 'src/'),
    },
  },
  //loaders
  module: {
    rules: [
      //html
      {
        test: /\.html$/i,
        loader: "html-loader",
        },
      //css
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
            
            (mode === 'development') ? "style-loader" : MiniCssExtractPlugin.loader,
            "css-loader",
            {
                loader: "postcss-loader",
                options: {
                    postcssOptions: {
                        plugins: [
                            [
                                "postcss-preset-env",
                                {
                                    // Options
                                },
                            ],
                        ],
                    },
                },
            },
            "sass-loader",
        ],
      },
      //images
      { test: /\.(svg|ico|png|webp|jpg|gif|jpeg)$/, type: 'asset/resource' },
      //fonts
      { test: /\.(woff|eot|ttf|woff2)$/, type: 'asset/resource' },
      //js for babel
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader',
        // loader: 'pug-html-loader',
        // options: {
        //   exports: false
        // },
        exclude: /(node_modules|bower_components)/,
      },
    ],
  },
  //plugins
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html",
      filename: 'index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
  }),
  ],
};

