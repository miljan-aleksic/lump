const rollup = require('rollup')
const commonjs = require('rollup-plugin-commonjs')
const replace = require('rollup-plugin-replace')
const nodeResolve = require('rollup-plugin-node-resolve')

const write = require('@lump/write')

/*
 * Rollup build
 * f@ormat es|cjs|umd
 */
module.exports = async ({ config, options = {} }) => {
  if (!config) {
    throw new Error('Missing Arguments')
  }

  const plugins = [
    nodeResolve({
      jsnext: true,
      main: true
    }),
    commonjs()
  ]

  const _config = Object.assign({}, config)

  _config.plugins = _config.plugins
    ? plugins.concat(_config.plugins)
    : plugins

  if (options.env) {
    _config.plugins.push(replace({
      'process.env.NODE_ENV': JSON.stringify(options.env)
    }))
  }

  await rollup.rollup(_config).then(async bundle => {
    const result = await bundle.generate(_config)
    return write(_config.dest, result.code)
  })
}
