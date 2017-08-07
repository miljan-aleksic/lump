const chalk = require('chalk')
const semver = require('semver')

const engines = {
  node: '>= 7.8.0',
  npm: '>= 3.0.0'
}

/*
 * Run the main code
 */
module.exports = build => {
  log('') // leave starting space

  // check node env
  checkEnv(engines)

  build().then(() => {
    log('') // leave ending space
    process.exit() // make sure to exit
  }).catch(e => {
    log(e)
    log('')
    process.exit()
  })
}

function checkEnv (engines) {
  const exec = function (cmd) {
    return require('child_process')
      .execSync(cmd).toString().trim()
  }

  const versionRequirements = [{
    name: 'node',
    currentVersion: semver.clean(process.version),
    versionRequirement: engines.node
  }, {
    name: 'npm',
    currentVersion: exec('npm --version'),
    versionRequirement: engines.npm
  }]

  const warnings = []
  for (let i = 0; i < versionRequirements.length; i++) {
    const mod = versionRequirements[i]
    if (!semver.satisfies(mod.currentVersion, mod.versionRequirement)) {
      const current = chalk.red(mod.currentVersion)
      const required = chalk.green(mod.versionRequirement)

      warnings.push(chalk.cyan(`${mod.name} ${current} to ${required}`))
    }
  }

  if (warnings.length) {
    log(chalk.yellow('To use this build tool, you must update the following:'))
    log('')
    for (let i = 0; i < warnings.length; i++) {
      const warning = warnings[i]
      log('  ' + warning)
    }
    log('')
    process.exit()
  }
}

function log (msg) {
  console.log(msg)
}
