# jlint [![Build Status](http://img.shields.io/travis/srn/jlint.svg?style=flat-square)](https://travis-ci.org/srn/jlint)

> cli that parses the JSON you have in your current clipboard

![screenshot](screenshot.png)

## Install

```sh
$ npm i -g jlint
```

## Usage

```sh
$ jlint --help

  Example
    jlint

    {
      "hello": 1,
      "foo": "bar"
    }
    ✔︎
```

Piping also works:

```sh
$ cat log.json | jlint
```

## License

MIT © [Søren Brokær](http://srn.io)
