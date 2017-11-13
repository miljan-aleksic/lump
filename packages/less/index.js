const path = require('path')
const less = require('less')
const read = require('@lump/read')
const write = require('@lump/write')
const LessPluginCleanCSS = require('less-plugin-clean-css')

const defaults = {
  log: false,
  minify: false,
  sourceMap: false
  // ... less render options
}

/*
 * Compile less from file/less to file/css
 */
module.exports = async ({ src, content, dest, options = defaults }) => {
  if (!src && !content) {
    throw new Error('Missing Arguments')
  }

  // get less source
  const source = src
    ? await read(src)
    : content

  // set options
  if (options.sourceMap) {
    options.sourceMap = {
      sourceMapURL: `${path.basename(dest)}.map`
    }
  }

  if (options.minify) {
    options.plugins = [ new LessPluginCleanCSS() ]
  }

  // render
  const output = await less.render(source, options)

  if (dest) {
    await write(dest, output.css, { log: options.log })
  }

  if (dest && output.map) {
    await write(`${dest}.map`, output.map, { log: options.log })
  }

  return output.css
}
