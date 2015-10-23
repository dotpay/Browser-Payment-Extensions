var buttons = require('sdk/ui/button/action');
var tabs = require("sdk/tabs");

var button = buttons.ActionButton({
  id: "mozilla-link",
  label: "DotPay Plugin - Firefox",
  icon: {
    "16": "./Dotpay_16x16.png",
    "32": "./Dotpay_48x48.png",
    "64": "./Dotpay_64x64.png"
  },
  onClick: handleClick
});

function handleClick(state) {
  tabs.open("http://www.mozilla.org/");
}

// Import the page-mod API
var pageMod = require("sdk/page-mod");
var bankBGZ = require("sdk/page-mod");
var data = require("sdk/self").data;
var tabs = require("sdk/tabs");
var reciveData;



pageMod.PageMod({
  include: "https://ssl.dotpay.pl/t2/*",
  contentScriptFile: data.url('dotpay-info.js'),
  contentStyleFile: require("sdk/self").data.url("dotpay-info.css"),
  onAttach: startListening
});
bankBGZ.PageMod({
  include: "http://demo.ebgz.pl/demo/przelewy/wykonaj-przelew/krajowy/",
  contentScriptFile: data.url('dotpay-infoBGZ.js'),
  contentStyleFile: require("sdk/self").data.url("dotpay-info.css"),
  onAttach: startListening
});

function startListening(worker) {
  console.log('włączenie startListening')
  worker.port.on ('dotpayData', function(rdata) {
    if( Object.prototype.toString.call( rdata ) === '[object Array]' ) {
      reciveData = rdata;
      console.log('back-end recive data - Array: ')
      console.log(reciveData)
    }
    tabs.open("http://demo.ebgz.pl/demo/przelewy/wykonaj-przelew/krajowy/");
  });
  worker.port.on ('sendData', function(rdata) {
    console.log(rdata)
    if (reciveData != undefined) {
      worker.port.emit('reciveData', reciveData);
      console.log('IF!!!!! dane wysłane')
    }else {
      console.log('reciveData NIE jest tablicą!!!')
    }
  });
}
