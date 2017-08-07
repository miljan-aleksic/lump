const copy = require('recursive-copy')

/*
 * Copy a folder recursively with optional filtering
 */
module.exports = async ({ src, dest, filter = [] }) => {
  if (!src || !dest) {
    throw new Error('Missing Arguments')
  }

  await copy(src, dest, {
    filter: [
      ...['**/*'], // require to avoid filtering it all out
      ...filter
    ]
  })
}
