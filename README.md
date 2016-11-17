# brisky-stamp
Generate unique meta information for change in a system

[![Build Status](https://travis-ci.org/vigour-io/brisky-stamp.svg?branch=master)](https://travis-ci.org/vigour-io/brisky-stamp)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![npm version](https://badge.fury.io/js/brisky-stamp.svg)](https://badge.fury.io/js/brisky-stamp)
[![Coverage Status](https://coveralls.io/repos/github/vigour-io/brisky-stamp/badge.svg?branch=master)](https://coveralls.io/github/vigour-io/brisky-stamp?branch=master)

The idea is that stamp are synchronous, so you never have 2 stamps in progress at the same time in one thread

```javascript
const briskyStamp = require('brisky-stamp')

// briskyStamp.create(type, source, override)
// results in click-1
const stamp = briskyStamp.create('click')

// fires when a stamp closes (is handled)
briskyStamp.on(() => console.log('closing'))

// fires stamp listeners, usefull for debugging (all stamps need to be closed)
briskyStamp.close(stamp)

const parsed = briskyStamp.parse(stamp)
// returns a parsed stamp { type: 'click', val: 1 }

// remove all listeners
briskyStamp.clear()

// to debug use
const debug = require('brisky-stamp/debug')
debug(briskyStamp)
// this will throw errors when stamps are created while others are still open
briskyStamp.create(type, source, override, true) // ignores stamp creation for debugging
```
