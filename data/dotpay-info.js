var pageAdres = window.location.href;

function sendDataBGZ () {
  self.port.emit('dotpayDataBGZ',dotpayData);
  self.port.on ('reciveDataStatus', function (data) {
    document.getElementById('js-plugin-confirm').innerHTML = data;
  });
  self.port.emit ('checkData', 'checkData');
}
function sendDataCreditAgricole () {
  self.port.emit('dotpayDataCreditAgricole',dotpayData);
  self.port.on ('reciveDataStatus', function (data) {
    document.getElementById('js-plugin-confirm').innerHTML = data;
  });
  self.port.emit ('checkData', 'checkData');
}
function removeData () {
  self.port.emit ('removeData', 'Remove data request');
  self.port.on ('reciveDataStatus', function (data) {
    document.getElementById('js-plugin-confirm').innerHTML = data;
  });
  self.port.emit ('checkData', 'checkData');
}

/****************************************************
* Check if ssl.dotpay.pl - PAGE
*****************************************************/
if(pageAdres.startsWith('https://ssl.dotpay.pl')) {
  var img = document.getElementById('channel_container_').getElementsByTagName('a');
  var iban = document.getElementById('iban').value;
  var amount = document.getElementById('amount').value;
  var paymentTitle = document.getElementById('payment-title').value;
  var recipient = document.getElementById('recipient').value;
  var street = document.getElementById('street').value;
  var postCodeCity = document.getElementById('post-code-city').value;

  var dotpayData = new Array(6);
  dotpayData[0] = iban;
  dotpayData[1] = amount;
  dotpayData[2] = paymentTitle;
  dotpayData[3] = recipient;
  dotpayData[4] = street;
  dotpayData[5] = postCodeCity;


  /****************************************************
  * Display Plugin Box
  *****************************************************/
  if (img[0].href == 'http://www.bgz.pl/') {
    var info = document.getElementById('main-wrapper');
    info.innerHTML += '<div id="dotpay-info">'
                      +'<div class="plugin-button">'
                        +'<button id="js-plugin-send" class="plugin-send">Zapisz dane przelewu oraz idź do strony banku</button>'
                        +'<button id="js-plugin-clear">Usuś z pamięci zapisane dane do przelewu</button>'
                      +'</div>'
                      +'<div id="js-plugin-confirm" class="plugin-confirm"></div>'
                      +'<div class="plugin-title">'
                        +'<img src="/static_payment/images/layout/logos/logo.png" alt="doptay logo">Plugin DotPay.pl - Bank BGŻ '
                      +'</div> '
                    +'</div>';
  self.port.on ('reciveDataStatus', function (data) {
    document.getElementById('js-plugin-confirm').innerHTML = data;
  });
  self.port.emit ('checkData', 'checkData');
    document.getElementById('js-plugin-send').addEventListener('click', sendDataBGZ);  //Triger
    document.getElementById('js-plugin-clear').addEventListener('click', removeData);  //Triger
  } else if (img[0].href == 'https://e-bank.credit-agricole.pl/') {
    var info = document.getElementById('main-wrapper');
    info.innerHTML += '<div id="dotpay-info">'
                        +'<div class="plugin-button">'
                          +'<button id="js-plugin-send" class="plugin-send">Zapisz dane do przelewu oraz idź do strony banku</button>'
                          +'<button id="js-plugin-clear">Usuń z pamięci zapisane dane do przelewu</button>'
                        +'</div>'
                        +'<div id="js-plugin-confirm" class="plugin-confirm"></div>'
                        +'<div class="plugin-title">'
                          +'<img src="/static_payment/images/layout/logos/logo.png" alt="doptay logo">Plugin DotPay.pl - Credit Agricole'
                        +' </div> '
                      +'</div>' ;
  self.port.on ('reciveDataStatus', function (data) {
    document.getElementById('js-plugin-confirm').innerHTML = data;
  });
  self.port.emit ('checkData', 'checkData');
    document.getElementById('js-plugin-send').addEventListener('click', sendDataCreditAgricole);  //Triger
    document.getElementById('js-plugin-clear').addEventListener('click', removeData);  //Triger
  }
  else {
    console.log('Ten bank nie jest obsługiwany przez plugin DotPay');
  }
}
