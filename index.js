// var self = require('sdk/self');

// // a dummy function, to show how tests work.
// // to see how to test this function, look at test/test-index.js
// function dummy(text, callback) {
//   callback(text);
// }


// exports.dummy = dummy;

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
var recivedData = require("sdk/self");;

// Create a page-mod
// It will run a script whenever a ".org" URL is loaded
// The script replaces the page contents with a message
pageMod.PageMod({
  include: "https://ssl.dotpay.pl/t2/*",
  contentScriptFile: self.data.url('dotpay-info.js'),
  contentStyleFile: require("sdk/self").data.url("dotpay-info.css"),
  onAttach: function(worker) {
      worker.port.on("dotpayData", function (data) {
        recivedData = data;
        console.log(recivedData)
        if(recivedData != undefined) {
          worker.port.emit('dotpayData2',recivedData);
          console.log('Dane poszły w świat: ' + recivedData)
        }
    });
  }
});


