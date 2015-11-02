var buttons = require('sdk/ui/button/action');
var tabs = require("sdk/tabs");

var button = buttons.ActionButton({
  id: "mozilla-link",
  label: "DotPay Plugin - Firefox",
  icon: {
    "16": "./Dotpay_16x16.png",
    "32": "./Dotpay_48x48.png",
    "64": "./Dotpay_64x64.png"
  }
});
/****************************************************
* Import the page-mod API
*****************************************************/
var pageMod = require("sdk/page-mod");
var bankBGZ = require("sdk/page-mod");
var bankCreditAgricole = require("sdk/page-mod");
var data = require("sdk/self").data;
var tabs = require("sdk/tabs");
var reciveData;
/****************************************************
* Include scripts and CSS to page - Configuration
*****************************************************/
pageMod.PageMod({
  include: "https://ssl.dotpay.pl/t2/*",
  contentScriptFile: [data.url('dotpay-info.js'), data.url('dotpay-config.js')],
  contentStyleFile: require("sdk/self").data.url("dotpay-info.css"),
  onAttach: startListening
});
bankBGZ.PageMod({
  include: "https://www.ebgz.pl/*",
  contentScriptFile: [data.url('dotpay-infoBGZ.js'), data.url('dotpay-config.js')],
  contentStyleFile: require("sdk/self").data.url("dotpay-info.css"),
  onAttach: startListening
});
bankCreditAgricole.PageMod({
  include: "https://e-bank.credit-agricole.pl/*",
  contentScriptFile: [data.url('dotpay-infoCreditAgricole.js'), data.url('dotpay-config.js')],
  contentStyleFile: require("sdk/self").data.url("dotpay-info.css"),
  onAttach: startListening
});

/****************************************************
* Add-on worker - listening
*****************************************************/
function startListening(worker) {
  worker.port.on ('dotpayDataBGZ', function(rdata) {
    if( Object.prototype.toString.call( rdata ) === '[object Array]' ) {
      reciveData = rdata;
    }
  });

  worker.port.on ('dotpayDataCreditAgricole', function(rdata) {
    if( Object.prototype.toString.call( rdata ) === '[object Array]' ) {
      reciveData = rdata;
    }
  });
  worker.port.on ('sendData', function(rdata) {
    if (reciveData != undefined) {
      worker.port.emit('reciveData', reciveData);
    }
  });
   worker.port.on ('removeData', function(rdata) {
    reciveData = undefined;
  });
   worker.port.on ('checkData', function(rdata) {
    if (reciveData == undefined) {
      worker.port.emit('reciveDataStatus', 'Stan pamięci: Brak zapisanych danych');
    }
    else {
      worker.port.emit('reciveDataStatus', 'Stan pamięci: Dane do przelewu zostały zapisane ');
    }
  });
}
