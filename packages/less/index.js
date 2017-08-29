const lessCompiler = require('less')
const read = require('@lump/read')
const write = require('@lump/write')

/*
 * Compile less from file/less to file/css
 */
module.exports = async ({ src, content, dest, options = {} }) => {
  if (!src && !content) {
    throw new Error('Missing Arguments')
  }

  const less = src
    ? await read(src)
    : content
  const css = await renderLess(less, options)

  return dest
    ? write(dest, css)
    : css
}

function renderLess (data, options) {
  return lessCompiler.render(data, options)
    .then(output => output.css)
}
