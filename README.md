# styleless-epub

Opens `.epub` files, locates embedded `.css` *stylesheets*, and remove *styles* that override user settings on a *Kobo* e-reader. A *Kobo* e-reader applies user settings, such as `font-family` and `font-size`, on the document level. Thus embedded *stylesheets* can include rules that override user settings, which is detremental to user experience. Honestly, *Kobo* should fix the UX, but until then, `styleless-epub` helps.

# Prerequisites

* NodeJS >= 12 (http://nodejs.org/)
* NPM >= 6 (https://www.npmjs.org/)

# Install

## Debian (Mint, Ubuntu, etc)

1. Run in *Terminal*: `sudo apt-get install nodejs npm`
2. Run in *Terminal*: `sudo npm install -g styleless-epub`

## Mac OS X

1. Install *NodeJS* following the instructions at http://nodejs.org/
2. Run in *Terminal*: `npm install -g styleless-epub`

## Windows

1. Install *NodeJS* following the instructions at http://nodejs.org/
2. Run in *Command Prompt*: `npm install -g styleless-epub`

# Update

## Debian (Mint, Ubuntu, etc)

1. Ensure that `styleless-epub` is [installed](#Install)
2. Run in *Terminal*: `sudo npm install -g styleless-epub`

## Mac OS X

1. Ensure that `styleless-epub` is [installed](#Install)
2. Run in *Terminal*: `npm install -g styleless-epub`

## Windows

1. Ensure that `styleless-epub` is [installed](#Install)
2. Run in *Command Prompt*: `npm install -g styleless-epub`

# Usage

```
Usage: styleless-epub [options] [command]

Options:
  -V, --version              output the version number
  -h, --help                 display help for command

Commands:
  parse <resourcePath...>    Parses epub styles.
  restore <resourcePath...>  Restores epub styles.
  help [command]             display help for command
```

## Parse

To parse *styles* and remove *offending* styles from an `.epub`, run:

    styleless-epub parse /path/to/your/book.epub

Or to recursively find and parse `.epub` files in a folder, run:

    styleless-epub parse /path/to/your/folder

## Restore

To restore *styles* to add *offending* styles back to an `.epub`, run:

    styleless-epub restore /path/to/your/book.epub

Or to recursively find and restore `.epub` files in a folder, run:

    styleless-epub restore /path/to/your/folder

## Support for Calibre

Since *Calibre* stores `.epub` files in a single directory, you can just run:

    styleless-epub parse /path/to/your/calibre/library

# Offending Styles

These are the styles that are removed from *stylesheets* in an `.epub`:

* `font-family`
* `font-size`
* `letter-spacing`
* `line-height`
* `text-align` when `justify` or `left`
* `word-spacing`

# Contributions

While software contributions are welcome, you can also help with:

* Documentation
* Helping other people
* Feature requests
* Bug reports

# Questions?

Please make an issue if you have questions, wish to request a feature, etc.
