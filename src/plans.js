var browser = require('browser')
var Plan = require('./Plan')
var size = require('./size')

var plans = {
  'Vivo 50MB': new Plan(89.9, byte(130))
}

exports.allPlans = Object.keys(plans).sort()

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
    callback(plans[ options.plan || 'Vivo 50MB' ])
  })
}

function byte (giga) {
  return giga * 1024 * 1024 * 1024
}
