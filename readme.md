# jlint [![Build Status](http://img.shields.io/travis/srn/jlint.svg?style=flat-square)](https://travis-ci.org/srn/jlint) [![Dependency Status](http://img.shields.io/gemnasium/srn/jlint.svg?style=flat-square)](https://gemnasium.com/srn/jlint)


> CLI that parses the current JSON you have in your current clipboard.

## Install

```sh
$ npm install --global jlint
```

## Usage

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

Piping:

```sh
$ cat log.json | jlint
```

## License

MIT © [Søren Brokær](http://srn.io)
