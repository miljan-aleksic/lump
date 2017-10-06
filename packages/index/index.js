const path = require('path')
const globby = require('globby')
const write = require('@lump/write')

/*
 * Index directory modules for ES exporting
 */
module.exports = async ({ src, dest }) => {
  const index = []
  const modules = await globby.sync(src)

  modules.forEach(_path => {
    const ext = path.extname(_path)
    const basename = path.basename(_path, ext)
    const name = toCamelCase(basename)

    index.push(`export { default as ${name} } from './${basename}${ext}'`)
  })

  await write(dest, index.join('\n') + '\n')
}

function toCamelCase (str) {
  return str.replace(/-(\w)/g, toUpper)
}

function toUpper (_, c) {
  return c ? c.toUpperCase() : ''
}
