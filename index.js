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
var self = require("sdk/self");
var recivedData = require("sdk/page-worker");



pageMod.PageMod({
  include: "https://ssl.dotpay.pl/t2/*",
  contentScriptFile: self.data.url('dotpay-info.js'),
  contentStyleFile: require("sdk/self").data.url("dotpay-info.css"),
  onAttach: startListening
  // onAttach: function(worker) {
  //     worker.port.on("dotpayData", function (data) {
  //       recivedData = data;
  //       console.log(recivedData)
  //       if(recivedData != undefined) {
  //         worker.port.emit('dotpayData2',recivedData);
  //         console.log('Dane poszły w świat: ' + recivedData)
  //       }
  //   });
  // }
});

function startListening(worker) {
  worker.port.on ('dotpayData', function(data) {
    console.log('back-end data')
    console.log(data)
    worker.port.emit('dotpayData2', data);
  });
}

