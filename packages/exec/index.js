/*
 * Exec a command using child_process
 */
module.exports = async (command, options = {}) => {
  if (!command) {
    throw new Error('Missing Arguments')
  }

  await new Promise((resolve, reject) => {
    const exec = require('child_process').exec

    exec(command, options, (error, stdout, stderr) => {
      if (error !== null) {
        reject(error)
      } else {
        resolve()
      }
    })
  })
}
