var storage = require('./storage')
var Plan = require('./Plan')
var size = require('./size')

var plans = {
  'Vivo 50MB': new Plan(89.9, byte(130))
}

exports.getPrice = function (bytes) {
  return getPlan().getPrice(bytes)
}

exports.getPercentage = function (value) {
  return value / getPlan().limit
}

exports.isLimitExceeded = function () {
  return size.getMonthTotal() > getPlan().limit
}

function getPlan () {
  return plans[ storage.get('plan') || 'Vivo 50MB' ]
}

function byte (giga) {
  return giga * 1024 * 1024 * 1024
}
