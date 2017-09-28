const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const globby = require('globby')
const mkdirp = require('mkdirp')
const archiver = require('archiver')

const stats = []

/*
 * Zip matched patterns
 */
module.exports = async (src, dest) => {
  if (!src || !dest) {
    throw new Error('Missing Arguments')
  }

  return new Promise((resolve, reject) => {
    // make sure dest folder exists
    mkdirp.sync(path.dirname(dest), err => {
      throw err
    })

    // resolve patterns
    const sources = globby.sync(src)

    // create a file to stream archive data to
    var output = fs.createWriteStream(dest)
    var archive = archiver('zip')

    // listen for all archive data to be written
    output.on('close', () => {
      if (fs.existsSync(dest)) {
        const size = formatBytes(archive.pointer())
        logStat(chalk.cyan(`Created ${dest} - ${size}`))
        displayStats(stats)
        resolve()
        return
      }

      // if file doesn't exist
      reject(new Error(`Creation of ${dest} failed`))
    })

    archive.on('error', err => {
      throw err
    })

    // pipe archive data to the file
    archive.pipe(output)

    for (let src of sources) {
      archive.directory(src, false)
    }

    archive.finalize()
  })
}

function formatBytes (bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes'
  const k = 1000
  const dm = decimals || 2
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  let i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

function logStat (stat) {
  stats.push(stat)
}

function displayStats (stats) {
  if (stats.length > 0) {
    console.log(' ')
    stats.forEach(stat => console.log(stat))
    console.log(' ')
  }
}
