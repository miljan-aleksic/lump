const lumpit = require('@lump/it')
const task = require('@lump/task')
const remove = require('@lump/remove')
const copy = require('@lump/copy')

lumpit(async () => {
  await task({
    text: 'Build',
    exec: async () => {
      await copy({
        src: 'files/*',
        dest: 'new/ubication'
      })
      await remove('files')
    }
  })
})
