# jlint [![Build Status](http://img.shields.io/travis/srn/jlint.svg?style=flat-square)](https://travis-ci.org/srn/jlint) [![Dependency Status](http://img.shields.io/gemnasium/srn/jlint.svg?style=flat-square)](https://gemnasium.com/srn/jlint)


> CLI that parses the current JSON you have in your current clipboard

## Install

```sh
$ npm install jlint --save
```

## Usage

```js
var jlint = require('jlint');

console.log(jlint.parsed)
=> true

console.log(jlint.content)
{
  "hello": 1,
  "foo": "bar"
}

```

## CLI

```sh
$ npm install --global jlint
```

```sh
$ jlint --help

  Example
    jlint

    ✔︎
    {
      "hello": 1,
      "foo": "bar"
    }
```


## License

MIT © [Søren Brokær](http://srn.io)
