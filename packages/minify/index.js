const path = require('path')
const CleanCSS = require('clean-css')
const uglify = require('uglify-js')

const read = require('@lump/read')
const write = require('@lump/write')

/*
 * Minify CSS/JS files with optional sourceMap
 */
module.exports = async ({ src, sourceMap = false }) => {
  if (!src) {
    throw new Error('Missing Arguments')
  }

  let code
  let map
  const ext = path.extname(src)

  const content = await read(src)

  if (ext === '.css') {
    const minified = await _minifyCSS(content, sourceMap)
    code = minified.styles
    map = minified.sourceMap
  } else if (ext === '.js') {
    const minified = await _minifyJS(content, sourceMap)
    code = minified.code
    map = minified.map
  }

  if (sourceMap) {
    const dest = src.replace(ext, `.min${ext}.map`)
    const url = path.basename(dest)
    code += `\n/*# sourceMappingURL=${url}*/`

    await write(dest, map)
  }

  const dest = src.replace(ext, `.min${ext}`)
  await write(dest, code)
}

function _minifyCSS (content, sourceMap) {
  return new CleanCSS({
    sourceMap,
    advanced: false,
    keepSpecialComments: 0,
    rebase: false,
    returnPromise: true
  }).minify(content)
}

function _minifyJS (content, sourceMap) {
  return uglify.minify(content, {
    sourceMap,
    output: {
      ascii_only: true
    },
    compress: {
      pure_funcs: ['makeMap']
    }
  })
}
