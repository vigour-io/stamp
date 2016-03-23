# vigour-stamp
[![Build Status](https://travis-ci.org/vigour-io/stamp.svg?branch=master)](https://travis-ci.org/vigour-io/stamp)

Generates unique stamps for change, listen to close events

```javascript
var vstamp = require('vigour-stamp')

// vstamp.create(type, source, override)
// results in click-1
var stamp = vstamp.create('click')

// fires when a stamp closes (is handled)
vstamp.on(stamp, function () {

})

// fires the onclose listener
vstamp.close(stamp)

var parsed = vstamp.parse(stamp)
// returns a parsed stamp { type: 'click', val: 1 }

// remove all listeners
vstamp.remove(stamp)

```
