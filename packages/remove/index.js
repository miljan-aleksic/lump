const del = require('del')

/*
 * Delete files and folders using globs
 */
module.exports = async (src) => {
  await del(src)
}
