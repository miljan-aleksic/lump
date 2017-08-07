/* eslint-env jest */

const banner = require('@lump/banner')
const read = require('@lump/read')
const write = require('@lump/write')

test('add banner to PHP files', async () => {
  const file = 'tests/tmp/banner/file.php'

  await write(file, '<?php\n')
  await banner({
    src: file,
    banner: '/* banner */'
  })

  const result = await read(file)
  expect(result.replace(/\n/g, '')).toBe('<?php/* banner */')
})

test('add banner to JS files', async () => {
  const file = 'tests/tmp/banner/file.js'

  await write(file, '')
  await banner({
    src: file,
    banner: '/* banner */'
  })

  const result = await read(file)
  expect(result.replace(/\n/g, '')).toBe('/* banner */')
})
