const cpy = require('cpy')

/*
 * Copy files
 */
module.exports = async ({ src, dest, options = {} }) => {
  if (!src || !dest) {
    throw new Error('Missing Arguments')
  }

  await cpy(src, dest, options)
}
