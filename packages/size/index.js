const fs = require('fs')

module.exports = function (file) {
  let stats
  
  return new Promise((resolve, reject) => {
    try {
      stats = fs.statSync(file)
    } catch (e) {
      reject(e)
    }
    
    resolve(formatBytes(stats.size))
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
