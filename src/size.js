var storage = require('./storage')

exports.getSizes = function () {
  return storage.get('sizes') || []
}

exports.addSize = function (id, totalSize) {
  var sizes = exports.getSizes()
  var size = findMonthData(sizes)
  size.total += totalSize
  storage.put('sizes', sizes)
}

exports.getTotalSize = function () {
  return sumTotal(exports.getSizes())
}

exports.getMonthTotal = function () {
  return findMonthData(exports.getSizes()).total
}

function sumTotal (sizes) {
  return sizes.reduce(function (old, current) {
    return old + current.total
  }, 0)
}

function findMonthData (sizes) {
  var date = new Date()
  var size
  for (var i = 0; i < sizes.length; i++) {
    size = sizes[ 0 ]
    if (size.month === date.getMonth() && size.year === date.getYear()) {
      return size
    }
  }
  size = {
    month: date.getMonth(),
    year: date.getYear(),
    total: 0
  }
  sizes.push(size)
  return size
}
