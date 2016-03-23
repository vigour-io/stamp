# vigour-stamp
Generates unique stamps for change, listen to close event

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
```
