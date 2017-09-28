const fs = require('fs')
const path = require('path')
const mkdirp = require('mkdirp')
const download = require('download')

/*
 * Download files
 */
module.exports = async (url, dest) => {
  if (!url || !dest) {
    throw new Error('Missing Arguments')
  }

  // make sure dest dir exist
  mkdirp(path.dirname(dest))

  await download(url).then(data => {
    fs.writeFileSync(dest, data)
  })
}
