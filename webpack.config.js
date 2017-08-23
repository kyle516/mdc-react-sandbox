const path = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const RELEASE = process.env.NODE_ENV === 'production'
const DEBUG = !RELEASE
const PUBLIC_PATH = 'http://localhost:23300/'
const copyFiles = [
  {
    from: 'src/resources/index.html',
    to: 'index.html'
  },
  {
    from: 'src/resources/js',
    to: 'assets/js'
  }
]

module.exports = {
  cache: DEBUG,

  entry: './src/main.jsx',

  output: {
    sourcePrefix: '  ',
    path: path.join(__dirname, 'dist'),
    filename: 'assets/js/[name].bundle.js',
    publicPath: PUBLIC_PATH
  },

  target: 'web',

  devtool: DEBUG ? 'cheap-module-eval-source-map' : false,

  plugins: [
    new webpack.LoaderOptionsPlugin({
      debug: DEBUG,
      minimize: true,
      options: {
        context: __dirname
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(DEBUG ? 'development' : 'production')
      }
    }),
    new CleanWebpackPlugin(['dist']),
    ...(DEBUG ? [] : [
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: true,
        compress: {
          warnings: false,
          screw_ie8: true,
          conditionals: true,
          unused: true,
          comparisons: true,
          sequences: true,
          dead_code: true,
          evaluate: true,
          if_return: true,
          join_vars: true
        }
      })
    ]),
    new CopyWebpackPlugin(copyFiles)
  ],

  resolve: {
    modules: [
      path.resolve('./src'),
      'node_modules'
    ],
    extensions: ['.js', '.jsx']
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [
          path.resolve('src')
        ],
        use: [
          'babel-loader'
        ]
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[hash:8]-[name]-[local]'
            }
          }
        ]
      }
    ]
  }
}
