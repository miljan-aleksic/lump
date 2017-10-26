const fs = require('fs')
const zlib = require('zlib')
const path = require('path')
const chalk = require('chalk')
const mkdirp = require('mkdirp')
const { promisify } = require('util')

const gzipSync = promisify(zlib.gzip)
const mkdirpSync = promisify(mkdirp)

module.exports = function (dest, data, options = {}) {
  return new Promise(async (resolve, reject) => {

    try {
      await mkdirpSync(path.dirname(dest))
      await fs.writeFileSync(dest, data)
    } catch (e) {
      reject(e)
    }

    if (options.log) {
      const stat = await fs.statSync(dest)
      const size = formatBytes(stat.size)
      let report = `${dest} - ${size}`

      try {
        const zipped = await gzipSync(data)
        report += ` (${getSize(zipped)} gzipped)`
      } catch (e) {
        console.log(e)
      }

      log(report)
    }

    resolve(dest)
  })
}

function log (msg) {
  console.log(chalk.cyan(msg))
}

function getSize (code) {
  return (code.length / 1024).toFixed(2) + 'kb'
}

function formatBytes (bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes'
  const k = 1000
  const dm = decimals || 2
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  let i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}
