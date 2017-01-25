const bit = require('../')

const s = process.memoryUsage().heapUsed / 1024 / 1024
var i = 1e6 //clear after 1 mil
const arr = {}
var d = Date.now()
// while (i--) {
//   arr.push(bstamp.create(22222, 233223341))
// }
while (i--) {
  arr[i] = bit.create()
}
console.log(Date.now() - d, 'ms')
console.log(bit.create())

// // 13 mb = baseline
setTimeout(() => {
  console.log((process.memoryUsage().heapUsed / 1024 / 1024) - s + 'mb')
}, 1e3)
