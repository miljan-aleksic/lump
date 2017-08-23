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

## Getting Started

1. Run `npm i --save @lump/it` in your package directory.
1. Create the build script file at `scripts/build.js`.
1. Add the script execution `node scripts/build.js` in the `package.json`.
1. Run the build with `npm run build`.

## Gotchas

### Use relative paths to the project folder

No matter where your build is, the method path params expects a relative path
from the project root folder.

Example, if your build script is at `build/build.js` and the files you want to
match inside `src/files`, the glob to them would be `src/files/*`.

### Organize your tasks with the `task` method.

The `task` method allows to show a spinner and a text during execution. Keeping all
code wrapped into it allows for a nicer user experience and organization.

```js
await task({
  text: 'Spinner text 1',
  exec: () => copy({...})
})

// more complex tasks
await task({
  text: 'Spinner text 2',
  exec: async () => {
    await remove(...)
    await copy({...})
    ...
  }
})
```

### Execute tasks in parallel when possible

With `Promise.all` is possible to execute a group of `async` tasks in parallel
while the next chunk of code awaits for the completition of all the group tasks.

```js
await Promise.all([
  copy({...}),
  copy({...}),
  ...
])

// or inside of a task method
await task({
  text: 'Build',
  exec: () => Promise.all([
    copy({...}),
    copy({...}),
    ...
  ])
})
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
