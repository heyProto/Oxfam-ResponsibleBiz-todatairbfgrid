const webpack = require('webpack');
const minifier = require('minifier')
var path = require('path');

const input = './src/css/styles.css'
const options = {
  output: "./dist/0.0.1/card.min.css"
}
minifier.minify(input, options);

module.exports = {
  entry: {
    app: [ './main.js' ]
  },
  output: {
    path: __dirname,
    publicPath: '/',
    filename: './dist/0.0.1/card.min.js',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_debugger: true,
        drop_console: true
      }
    }),
    new webpack.optimize.AggressiveMergingPlugin()
  ],
  node: {
    net: 'empty',
    tls: 'empty',
    fs: 'empty'
  },
  devServer: {
    disableHostCheck: true
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query:
        {
          presets:['react']
        }
      },
      {
        test: /\.js$/,
        loader: 'babel',
        include: path.join(__dirname,'node_modules','url-regex')
      },
      {
        test: /\.css$/,
        loaders: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  }
};
