const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const mkdirp = require('mkdirp')

module.exports = function (dest, data, options = {}) {
  return new Promise(async (resolve, reject) => {

    try {
      await mkdirp(path.dirname(dest))
      await fs.writeFileSync(dest, data)
    } catch (e) {
      reject(e)
    }

    if (options.log) {
      const stat = await fs.statSync(dest)
      const size = formatBytes(stat.size)

      log(`${dest} - ${size}`)
    }

    resolve(dest)
  })
}

function log (msg) {
  console.log(chalk.blue(msg))
}

function formatBytes (bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes'
  const k = 1000
  const dm = decimals || 2
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  let i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}
