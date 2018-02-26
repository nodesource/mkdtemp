# mkdtemp

[`fs.mkdtemp`](https://nodejs.org/api/fs.html#fs_fs_mkdtemp_prefix_options_callback) from node core, introduced in `5.10.0`, for node `4.0.0` and up.

This method and its synchronous counterpart will create a temporary directory with a random name, based on the prefix you're passing to them.

## Installation

```bash
$ npm install mkdtemp
```

## Usage

```js
const mkdtemp = require('mkdtemp')

mkdtemp('/tmp/foo-', function (err, dir) {
  console.log(dir) // /tmp/foo-5cb92a
})

const dir = mkdtemp.sync('/tmp/foo-')
console.log(dir) // /tmp/foo-651fe9
```

## API

### mkdtemp(prefix, callback)
### mkdtemp(prefix)

## License

Copyright 2018 NodeSource

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.