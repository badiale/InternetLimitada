var bytes = require('bytes')

exports.price = function (number) {
  return 'R$ ' + number.toFixed(2)
}

exports.bytes = function (number) {
  return bytes(number, { decimalPlaces: 0 })
}

exports.percentage = function (number) {
  return (number * 100).toFixed(2) + '%'
}
