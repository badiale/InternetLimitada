var format = require('./format')
var size = require('./size')
var plans = require('./plans')

exports.Bytes = function (callback) {
  callback(format.bytes(size.getMonthTotal()))
}

exports.Porcentagem = function (callback) {
  plans.getPercentage(size.getMonthTotal(), function (percentage) {
    callback(percentage.toFixed(0))
  })
}

exports.Preco = function (callback) {
  plans.getPrice(size.getMonthTotal(), function (price) {
    callback(price.toFixed(0))
  })
}
