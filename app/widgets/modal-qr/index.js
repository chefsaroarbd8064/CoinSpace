'use strict';

var Ractive = require('cs-modal')
var emitter = require('cs-emitter')
var qrcode = require('cs-qrcode')
var getNetwork = require('cs-network')

module.exports = function showTooltip(data){
  data.mailto = mailto

  var ractive = new Ractive({
    el: document.getElementById('tooltip'),
    partials: {
      content: require('./content.ract').template,
    },
    data: data
  })

  var canvas = ractive.nodes['qr-canvas']
  var qr = qrcode(getNetwork() + ':' + ractive.get('address'))
  canvas.appendChild(qr)

  ractive.on('close', function(){
    ractive.fire('cancel')
  })

  function mailto(){
    return 'mailto:?body='+data.address+'%0A%0ASent%20from%20Coin%20Space%20Wallet%0Ahttps%3A%2F%2Fcoin.space'
  }

  return ractive
}

