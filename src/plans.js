var browser = require('browser')
var Plan = require('./Plan')
var size = require('./size')

exports.getPrice = function (bytes, callback) {
  getPlan(function (plan) {
    callback(plan.getPrice(bytes))
  })
}

exports.getPercentage = function (value, callback) {
  getPlan(function (plan) {
    callback(value / plan.limit)
  })
}

exports.isLimitExceeded = function (callback) {
  getPlan(function (plan) {
    callback(size.getMonthTotal() > plan.limit)
  })
}

function getPlan (callback) {
  browser.options.get(function (options) {
    callback(new Plan(options.price, byte(options.limit)))
  })
}

function byte (giga) {
  return giga * 1024 * 1024 * 1024
}
