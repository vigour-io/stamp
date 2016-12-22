# brisky-stamp
Generate unique meta information for change in a system, monotonic timestamps

[![Build Status](https://travis-ci.org/vigour-io/brisky-stamp.svg?branch=master)](https://travis-ci.org/vigour-io/brisky-stamp)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![npm version](https://badge.fury.io/js/brisky-stamp.svg)](https://badge.fury.io/js/brisky-stamp)
[![Coverage Status](https://coveralls.io/repos/github/vigour-io/brisky-stamp/badge.svg?branch=master)](https://coveralls.io/github/vigour-io/brisky-stamp?branch=master)

```javascript
const stamp = require('brisky-stamp')

// stamp.create(type, source, override)
// results in [ 946725040140, 0, 21158948 ]
// only lowercase letters from the alphabet are supported (base(36))

console.log(stamp.create('click'))

// fires when a stamp closes (is handled)
stamp.on(() => console.log('closing'))

// fires stamp listeners
stamp.close()

const parsed = stamp.parse(stamp)
// returns a parsed stamp { type: 'click', val: 1 }

// remove all listeners
stamp.clear()

// offset internal clock
stamp.offset = 100 // add 100 ms to timestamps

// check if listeners are in progress
stamp.inProgress // true or false
```

**note** Types only support base 36 characters - beware! (lowercase letters from the alphabet)
