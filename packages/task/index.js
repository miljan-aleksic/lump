const ora = require('ora')

/*
 * Run a task with spinner indication
 */
module.exports = (text, exec) => {
  if (!text || !exec) {
    throw new Error('Missing Arguments')
  }

  const spinner = ora(text).start()

  return exec()
    .then(result => spinner.succeed())
    .catch(err => {
      spinner.fail()
      warn(err)
      process.exit()
    })
}

function warn (msg) {
  console.log('')
  console.log(msg)
  console.log('')
}
