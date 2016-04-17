function Plan (price, limit) {
  this.price = price
  this.limit = limit
}

Plan.prototype.getPrice = function (bytes) {
  return bytes * this.price / this.limit
}

module.exports = Plan
