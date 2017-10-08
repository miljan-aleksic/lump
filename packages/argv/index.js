const minimist = require('minimist')

/*
 * Return node process arguments with an easier to use format
 */
module.exports = (options = {}) => {
  return minimist(process.argv.slice(2), options)
}
