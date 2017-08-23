const lumpit = require('@lump/it')
const task = require('@lump/task')
const less = require('@lump/less')
const minify = require('@lump/minify')

lumpit(async () => {
  await task({
    text: 'Compile Theme',
    exec: async () => {
      await less({
        src: 'src/less/theme.less',
        dest: 'dist/library.css',
        options: {
          relativeUrls: true
        }
      })

      await minify({
        src: 'dist/library.css'
      })
    }
  })
})
