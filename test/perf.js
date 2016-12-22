// const bit = require('../')
// const old = require('../lib/old')
// // var stamp = bstamp.create('click', 'mac')
// // stamp = bstamp.create('click')
// const bit = require('../lib/bit')

// var n = 1e6

// var d = Date.now()
// var i = n
// while (i--) {
//   bstamp.create()
// }
// console.log(Date.now() - d, 'ms')
// console.log(bstamp.create())

// var d = Date.now()
// var i = n
// while (i--) {
//   bit.create()
// }
// console.log(bit.create(), bit.src(bit.create()))
// console.log(Date.now() - d, 'ms')

// var d = Date.now()
// var i = n
// while (i--) {
//   bstamp.create(false, 233223341)
// }
// console.log(Date.now() - d, 'ms')

// var d = Date.now()
// var x = bstamp.create(false, 233223341)
// var i = n
// while (i--) {
//   bstamp.src(x)
// }
// console.log(Date.now() - d, 'ms')
// console.log(bstamp.create(false, 233223341), bstamp.src(bstamp.create(false, 233223341)))

// var d = Date.now()
// var i = n
// while (i--) {
//   bit.create(233223341)
// }
// console.log(Date.now() - d, 'ms')
// var d = Date.now()
// var i = n
// var x = bit.create(false, 233223341)
// while (i--) {
//   bit.src(x)
// }
// console.log(Date.now() - d, 'ms')
// console.log(bit.create(false, 233223341), bit.src(bit.create(false, 10)))

// console.log(bit.val(bit.create(10)))

// const s = process.memoryUsage().heapUsed / 1024 / 1024
// i = 1e7
// const arr = []
// var d = Date.now()
// // while (i--) {
// //   arr.push(bstamp.create(22222, 233223341))
// // }
// while (i--) {
//   arr.push(bit.create('hello', 21213123123))
//   bit.src(arr[i])
// }
// console.log(Date.now() - d, 'ms')
// console.log(bit.create('hello', 21213123123))

// // // 13 mb = baseline
// console.log((process.memoryUsage().heapUsed / 1024 / 1024) - s + 'mb')

  // -- this is so much faster -- :(
  // exports.create = (src, override, type) => (src || 0) * 1073741824 + (override || ms())
  // exports.src = stamp => (stamp - (stamp & 1073741823)) / 1073741824
  // exports.val = stamp => stamp & 1073741823
