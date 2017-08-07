const lessCompiler = require('less')
const read = require('@lump/read')
const write = require('@lump/write')

/*
 * Compile less file
 */
module.exports = async ({ src, dest, options }) => {
  if (!src || !dest) {
    throw new Error('Missing Arguments')
  }

  const less = await read(src)
  const css = await renderLess(less, options)

  await write(dest, css)
}

function renderLess (data, options) {
  return lessCompiler.render(data, options)
    .then(output => output.css)
}
