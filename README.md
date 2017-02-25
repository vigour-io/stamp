# stamp
Generate unique meta information for change in a system, monotonic timestamps

[![Build Status](https://travis-ci.org/vigour-io/stamp.svg?branch=master)](https://travis-ci.org/vigour-io/stamp)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![npm version](https://badge.fury.io/js/stamp.svg)](https://badge.fury.io/js/stamp)
[![Coverage Status](https://coveralls.io/repos/github/vigour-io/stamp/badge.svg?branch=master)](https://coveralls.io/github/vigour-io/stamp?branch=master)

```javascript
const stamp = require('stamp')

// stamp.create()
// results in 946725040140

// fires when a stamp closes (is handled)
stamp.on(() => console.log('closing'))

// fires stamp listeners
stamp.close()

const parsed = stamp.parse(stamp)
// returns a valid date time stamp

// remove all listeners
stamp.clear()

// offset internal clock
stamp.offset = 100 // add 100 ms to timestamps

// check if listeners are in progress
stamp.inProgress // true or false
```
