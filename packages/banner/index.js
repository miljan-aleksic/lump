const path = require('path')
const globby = require('globby')
const read = require('@lump/read')
const write = require('@lump/write')

/*
 * Add top banner to matched glob patterns
 */
module.exports = async ({ src, banner }) => {
  if (!src || !banner) {
    throw new Error('Missing Arguments')
  }

  const files = await globby(src, {
    nodir: true
  })

  return applyBanner(files, banner)
}

async function applyBanner (files, banner) {
  await Promise.all(files.map(
    async file => {
      await _applyBanner(file, banner)
    }
  ))
}

async function _applyBanner (file, banner) {
  const ext = path.extname(file)
  let content = await read(file)

  if (ext === '.php') {
    content = content.replace(/^<\?php/g, `<?php\n${banner}`)
  } else {
    content = `${banner}\n\n${content}`
  }

  return write(file, content)
}
