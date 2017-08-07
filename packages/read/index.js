const fs = require('fs')

module.exports = function (file) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        return reject(err)
      }

      resolve(data)
    })
  })
}
