# Lump

<p align="center">
  <a href="https://github.com/miljan-aleksic/lump">
    <img width="150" src="https://cdn.rawgit.com/miljan-aleksic/lump/6c3e1332/logo.png">
  </a>
</p>
<p align="center">
  A collection of methods for build workflows relying mostly on async/await
</p>

## Dependencies

 - Node 7.8+
 - NPM 3.0+

## Usage

Prepare the build file.

```js
const lumpit = require('@lump/it')
const task = require('@lump/task')
const remove = require('@lump/remove')
const copy = require('@lump/copy')

lumpit(async () => {
  // execute commands directly
  await remove('dist')

  // execute tasks with spinner and text indicator
  await task({
    text: 'Build',
    exec: () => copy({...})
  })

  // execute more complex tasks
  await task({
    text: 'Build',
    exec: async () => {
      await remove('dist')
      await copy({...})
      ...
    }
  })

  // execute tasks in parallel
  await Promise.all([
    copy({...}),
    copy({...}),
    ...
  ])

  // or
  await task({
    text: 'Build',
    exec: () => Promise.all([
      copy({...}),
      copy({...}),
      ...
    ])
  })
})
```

Add a script in the `package.json`.

```js
{
  "scripts": {
    "build": "node build.js"
  }
}
```

And run the script.

```js
npm run build
```

## Methods

### @lump/it

Run the main build process.

Only one argument expected, the function to be executed.

### @lump/task

Group and run methods with a spinner indicator.

Arguments
 - text, text for the spinner
 - exec, the function to be executed

### @lump/banner

Apply a banner to all matched files.

Arguments
 - src, glob pattern
 - banner, the banner template string

### @lump/copy

Copy matched files.

Arguments
 - src, glob pattern
 - dest, relative path
 - options, as described at https://github.com/sindresorhus/cpy

### @lump/copy-recursive

Copy a folder recursively

Arguments
 - src, glob pattern
 - dest, relative path
 - filter, glob pattern to exclude files

### @lump/download

Download a file from an external resource.

Arguments
 - url
 - dest, relative path

### @lump/exec

Execute console commands a child_process

Arguments
 - command
 - options, command options

### @lump/less

Compile a less file.

Arguments
 - src, relative path
 - dest, relative path
 - options, less options

### @lump/minify

Minify a CSS/JS file with options source map.

Arguments
 - src, relative path
 - sourceMap, defaults to false

### @lump/read

Read file content.

Argument, src to file

### @lump/write

Write content to a file.

Arguments
 - dest, relative path
 - content, string

### @lump/zip

Archive and ZIP matched files.

Arguments
 - src, glob pattern
 - dest, zip path

### @lump/remove

Delete matched files.

Argument, blog pattern

### @lump/rollup

A wrapper around rollup.

Arguments
 - config, Rollup config
 - options, specific lump options
  - env, optional 'development' or 'production'

### @lump/webpack

A wrapper around Webpack.

Arguments
 - config, webpack config

## Development

This project is organized as a monorepo using [Yarn Workspaces](https://yarnpkg.com/blog/2017/08/02/introducing-workspaces/) relying on Yarn 0.27.5+.

## License

This project is open source and released under the [MIT License](LICENSE).

Copyright (c) 2017-present, [Miljan Aleksic](https://twitter.com/AleksicMiljan)
