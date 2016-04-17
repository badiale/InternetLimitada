var browser = require('./browser')
var plans = require('../../plans')
var iconText = require('../../iconText')

fillOptions('plan', plans.allPlans)
fillOptions('icon', Object.keys(iconText).sort())
browser.options.get(function (options) {
  document.getElementById('block').checked = options.block
})

var saveButton = document.getElementById('save')
saveButton.addEventListener('click', function () {
  var plan = getSelected('plan')
  var icon = getSelected('icon')
  var block = document.getElementById('block').checked
  browser.options.set({
    plan: plan,
    icon: icon,
    block: block
  }, function () {
    saveButton.disabled = true
    saveButton.value = 'Salvo com sucesso'
    setTimeout(function () {
      saveButton.disabled = false
      saveButton.value = 'Salvar'
    }, 700)
  })
})

function fillOptions (id, values) {
  browser.options.get(function (options) {
    var option = options[ id ]
    var div = document.getElementById(id)
    values.forEach(function (value) {
      var label = document.createElement('label')
      label.style.display = 'block'
      div.appendChild(label)

      var radio = document.createElement('input')
      radio.type = 'radio'
      radio.value = value
      radio.name = id
      if (value === option) {
        radio.checked = true
      }
      label.appendChild(radio)

      var span = document.createElement('span')
      span.innerHTML = value
      label.appendChild(span)
    })
  })
}

function getSelected (id) {
  return document.querySelector('[name="' + id + '"]:checked').value
}
