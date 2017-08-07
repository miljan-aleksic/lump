const fs = require('fs')
const path = require('path')
const mkdirp = require('mkdirp')

module.exports = function (dest, data) {
  return new Promise((resolve, reject) =>
    mkdirp(path.dirname(dest), err => {
      if (err) {
        reject(err)
      }

      fs.writeFile(dest, data, err => {
        if (err) {
          return reject(err)
        }
        resolve(dest)
      })
    })
  )
}
