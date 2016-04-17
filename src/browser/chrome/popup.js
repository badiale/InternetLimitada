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
  var show
  if (plans.isLimitExceeded()) {
    show = 'block'
  } else {
    show = 'none'
  }
  document.querySelector('.alert').style.display = show
}

function setTotal (id, value) {
  document.getElementById(id).innerHTML = format.bytes(value)
  document.getElementById(id + '_percentage').innerHTML = format.percentage(plans.getPercentage(value))
  document.getElementById(id + '_price').innerHTML = format.price(plans.getPrice(value))
}
