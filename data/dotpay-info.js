var pageAdres = window.location.href;

function sendDataBGZ () {
  self.port.emit('dotpayData',dotpayData);
}
function reciveDataBGZ () {
  console.log('funkcja do odbierania danych')
  self.port.on("dotpayData2", function (data) {
    console.log(data)
  });
  console.log('to jest recivedata: ' + recivedData)
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
                        +'<img src="/static_payment/images/layout/logos/logo.png" alt="doptay logo">Plugin DotPay.pl - BGŻ '
                      +'</div> '
                    +'</div>';
    document.getElementById('js-plugin-send').addEventListener('click', sendDataBGZ);  //Triger
    document.getElementById('js-plugin-clear').addEventListener('click', reciveDataBGZ);  //Triger
  } else if (img[0].href == 'https://e-bank.credit-agricole.pl/') {
    var info = document.getElementById('main-wrapper');
    info.innerHTML += '<div id="dotpay-info">'
                        +'<div class="plugin-button">'
                          +'<button id="js-plugin-send" class="plugin-send">Zapisz dane do przelewu oraz idź do strony banku</button>'
                          +'<button id="js-plugin-clear">Usuń z pamięci zapisane dane do przelewu</button>'
                        +'</div>'
                        +'<div id="js-plugin-confirm" class="plugin-confirm"></div>'
                        +'<div class="plugin-title">'
                          +'<img src="/static_payment/images/layout/logos/logo.png" alt="doptay logo">Plugin DotPay - Credit Agricole'
                        +' </div> '
                      +'</div>' ;
    document.getElementById('js-plugin-send').addEventListener('click', sendDataCreditAgricole);  //Triger
  }
  else {
    console.log('Ten bank nie jest obsługiwany przez plugin DotPay');
  }


  // chrome.storage.sync.get('dotpayData', function(data){
  //   if (data.dotpayData == undefined) {
  //     document.getElementById('js-plugin-confirm').innerHTML = "Brak zapisanych danych w pamięci";
  //   }
  //   else {
  //     document.getElementById('js-plugin-confirm').innerHTML = "W pamięci przeglądarki są już zapisane dane do realizacji przelewu";
  //   }
  // });

  /****************************************************
  * Triger
  *****************************************************/
  // document.getElementById('js-plugin-clear').addEventListener(
  // 'click', clearData);
}
