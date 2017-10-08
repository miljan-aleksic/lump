const fs = require('fs')
const path = require('path')
const mkdirp = require('mkdirp')

module.exports = function (dest, data) {
  return new Promise(async (resolve, reject) => {

    try {
      await mkdirp(path.dirname(dest))
      await fs.writeFileSync(dest, data)
    } catch (e) {
      reject(e)
    }

    resolve(dest)
  })
}
