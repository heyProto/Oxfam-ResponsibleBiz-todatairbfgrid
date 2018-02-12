const webpack = require('webpack');
var path = require('path');
module.exports = {
  entry: ['./main.js','./main_edit.js'],
  output: {
    path: './',
    filename: './dist/0.0.1/edit-card.min.js'
  },
  plugin: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  ],
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
    '../../lib/js/react-jsonschema-form': 'JSONSchemaForm',
    'axios': 'axios'
  },
  node: {
    net: 'empty',
    tls: 'empty',
    fs: 'empty'
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
