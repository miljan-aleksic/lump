const rollup = require('rollup')
const rollupAnalyzer = require('rollup-analyzer')
const commonjs = require('rollup-plugin-commonjs')
const nodeResolve = require('rollup-plugin-node-resolve')

/*
 * Rollup bundler wrapper
 */
module.exports = async (_config, { report = false }) => {
  const plugins = [
    nodeResolve({
      jsnext: true,
      main: true
    }),
    commonjs()
  ]

  const config = {..._config}

  config.plugins = config.plugins
    ? plugins.concat(config.plugins)
    : plugins

  const bundle = await rollup.rollup(config)

  if (report) {
    const analyze = rollupAnalyzer({ limit: 5 })

    try {
      // print console optimized analysis string
      await analyze.formatted(bundle).then(console.log)
    } catch (e) {
      console.error(e)
    }
  }

  return bundle.generate(config.output)
}
