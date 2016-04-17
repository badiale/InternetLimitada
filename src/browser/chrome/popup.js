var size = require('../../size')
var format = require('../../format')
var plans = require('../../plans')

showSize()
setInterval(showSize, 500)

function showSize () {
  showAlert()
  setTotal('month', size.getMonthTotal())
}

function showAlert () {
  plans.isLimitExceeded(function (exceeded) {
    var show
    if (exceeded) {
      show = 'block'
    } else {
      show = 'none'
    }
    document.querySelector('.alert').style.display = show
  })
}

function setTotal (id, value) {
  document.getElementById(id).innerHTML = format.bytes(value)
  plans.getPercentage(value, function (value) {
    document.getElementById(id + '_percentage').innerHTML = format.percentage(value)
  })
  plans.getPrice(value, function (value) {
    document.getElementById(id + '_price').innerHTML = format.price(value)
  })
}
