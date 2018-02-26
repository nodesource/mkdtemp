# mkdtemp

[`fs.mkdtemp`](https://nodejs.org/api/fs.html#fs_fs_mkdtemp_prefix_options_callback) from node core, introduced in `5.0.0`, for node v4.

This method and its synchronous counterpart will create a temporary directory with a random name, based on the prefix you're passing to them.

## Installation

```bash
$ npm install @nodesource/mkdtemp
```

## Usage

```js
const mkdtemp = require('@nodesource/mkdtemp')

mkdtemp('/tmp/foo-', function (err, dir) {
  console.log(dir) // /tmp/foo-5cb92a
})

const dir = mkdtemp.sync('/tmp/foo-')
console.log(dir) // /tmp/foo-651fe9
```

## API

### mkdtemp(prefix, callback)
### mkdtemp(prefix)