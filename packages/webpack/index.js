const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')

/*
 * Compile webpack
 */
module.exports = (config) => {
  return new Promise((resolve, reject) => {
    const compiler = webpack(merge(config, baseConfig))

    compiler.run((err, stats) => {
      if (err) {
        throw err
      }

      logStat(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
      }))

      displayStats()
      resolve()
    })
  })
}

const stats = []

function logStat (stat) {
  stats.push(stat)
}

function displayStats (stat) {
  if (stats.length > 0) {
    console.log(' ')
    stats.forEach(stat => console.log(stat))
    console.log(' ')
  }
}

// const babelOptions = {
//   babelrc: false,
//   presets: [require.resolve('babel-preset-vue-app')]
// }

const baseConfig = {
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    modules: [
      // add this project modules
      path.resolve(__dirname, '../node_modules'),
      // add modules from project using this
      path.resolve(process.cwd(), 'node_modules')
    ]
  },
  module: {
    rules: [
      // {
      //   test: /\.vue$/,
      //   loader: 'vue-loader',
      //   options: {
      //     loaders: {
      //       js: {
      //         loader: 'babel-loader',
      //         options: babelOptions
      //       }
      //     }
      //   }
      // },
      // {
      //   test: /\.js$/,
      //   exclude: /(node_modules)/,
      //   loader: 'babel-loader',
      //   options: babelOptions
      // }
    ]
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    // short-circuits all Vue.js warning code
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    })
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false
    //   },
    //   sourceMap: true
    // })
  ]
}
