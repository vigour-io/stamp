# vigour-stamp
Generates unique stamps for change, possiblity to observe progress of stamps

```javascript
var vstamp = require('vigour-stamp')

vstamp.on('new', function (stamp) {})
// vstamp.on('new', function (stamp) {}, id, passon)
vstamp.on('close', function (stamp, //passon) {})

// vstamp.create(type, source, override)
var stamp = vstamp.create('click')
// results in 'click-1'

// vstamp.stamps = { 'click-1': true } // can get info like waiting for example

vstamp.close(stamp)
```
