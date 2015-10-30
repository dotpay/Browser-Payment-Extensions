var pageAdres = window.location.href;
/****************************************************
* Configuration
*****************************************************/
var configBGZ = {
  newWindowURL: 'http://demo.ebgz.pl/demo/przelewy/wykonaj-przelew/krajowy/',
  accountNumber: 'id_account_nr',
  amount: 'id_amount',
  title: 'id_title',
  name: 'id_name',
  adresFirst: 'id_address1',
  adresSecond: 'id_address2'
}
var configCreditAgricole = {
  newWindowURL: 'http://demo.credit-agricole.pl/konta/symfonia/single_transfer-nowy-przelew-zwykly.htm',
  accountNumber: 'ben_account',
  amount: 'amount',
  title: 'title_1',
  name: 'beneficiary_1',
  adresFirst: 'beneficiary_2',
  adresSecond: 'beneficiary_3'
}
/****************************************************
* Send data to plugin
*****************************************************/
function sendDataCreditAgricole(e) {
  e.preventDefault();
  chrome.runtime.sendMessage(dotpayData, function(response){
    document.getElementById('js-plugin-confirm').innerHTML = response.confirm;
    window.open(configCreditAgricole.newWindowURL,'_blank');
  });
}
function sendDataBGZ(e) {
  e.preventDefault();
  chrome.runtime.sendMessage(dotpayData, function(response){
    document.getElementById('js-plugin-confirm').innerHTML = response.confirm;
    window.open(configBGZ.newWindowURL,'_blank');
  });
}
/*****************************************************
* Recive data for Credit Agricole - Plugin           *
*****************************************************/
function reciveDataCreditAgricole() {
  chrome.storage.sync.get('dotpayData', function(data){
    if (data.dotpayData != undefined) {
      document.getElementById(configCreditAgricole.accountNumber).value = data.dotpayData[0];
      document.getElementById(configCreditAgricole.amount).value = data.dotpayData[1];
      document.getElementById(configCreditAgricole.title).value = data.dotpayData[2];
      document.getElementById(configCreditAgricole.name).value = data.dotpayData[3];
      document.getElementById(configCreditAgricole.adresFirst).value = data.dotpayData[4];
      document.getElementById(configCreditAgricole.adresSecond).value = data.dotpayData[5];
      // Remove form storage after recive data
      chrome.storage.sync.clear(function(data){
        document.getElementById('js-plugin-confirm').innerHTML = "Formularz został uzupełniony, a zapisane dane zostały usunięte z pamięci przeglądarki";
      });
    }
  });
}

/****************************************************
* Recive data for BGZ - Plugin                      *
*****************************************************/
function reciveDataBGZ() {
  chrome.storage.sync.get('dotpayData', function(data){
    if (data.dotpayData != undefined) {
      document.getElementById(configBGZ.accountNumber).value = data.dotpayData[0];
      document.getElementById(configBGZ.amount).value = data.dotpayData[1];
      document.getElementById(configBGZ.title).value = data.dotpayData[2];
      document.getElementById(configBGZ.name).value = data.dotpayData[3];
      document.getElementById(configBGZ.adresFirst).value = data.dotpayData[4];
      document.getElementById(configBGZ.adresSecond).value = data.dotpayData[5];
      // Remove form storage after recive data
      chrome.storage.sync.clear(function(data){
        document.getElementById('js-plugin-confirm').innerHTML = "Formularz został uzupełniony, a zapisane dane zostały usunięte z pamięci przeglądarki";
      });
    }
  });
}
/****************************************************
* Remove data for plugin                            *
*****************************************************/
function clearData(e) {
  e.preventDefault();
  chrome.storage.sync.clear(function(data){
    document.getElementById('js-plugin-confirm').innerHTML = "Stan pamięci: Dane zostały usunięte z pamięci";
  });
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
                        +'<img src="/static_payment/images/layout/logos/logo.png" alt="doptay logo">Plugin DotPay.pl - BGŻ BNP PARIBAS'
                      +'</div> '
                    +'</div>';
    document.getElementById('js-plugin-send').addEventListener('click', sendDataBGZ);  //Triger
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

  chrome.storage.sync.get('dotpayData', function(data){
    if (data.dotpayData == undefined) {
      document.getElementById('js-plugin-confirm').innerHTML = "Stan pamięci: Brak zapisanych danych w pamięci";
    }
    else {
      document.getElementById('js-plugin-confirm').innerHTML = "W pamięci przeglądarki są już zapisane dane do realizacji przelewu";
    }
  });

  /****************************************************
  * Triger
  *****************************************************/
  document.getElementById('js-plugin-clear').addEventListener(
  'click', clearData);
}
/****************************************************
* Check if demo.credit-agricole.pl - PAGE
*****************************************************/
if(pageAdres.startsWith('http://demo.credit-agricole.pl/')) {
  var info = document.getElementById('mainForm');
  info.innerHTML += '<div id="dotpay-info-bank">'
                      +'<div id="js-plugin-confirm" class="plugin-confirm"></div>'
                      +'<div class="plugin-title">'
                        +'<img src="https://ssl.dotpay.pl/static_payment/images/layout/logos/logo.png" style="height: 20px" alt="doptay logo">Plugin DotPay.pl - Credit Agricole '
                      +'</div> '
                    +'</div>'

  chrome.storage.sync.get('dotpayData', function(data){
    if (data.dotpayData == undefined) {
      document.getElementById('js-plugin-confirm').innerHTML = "Stan pamięci: Brak zapisanych danych w pamięci";
    }
    else {
      document.getElementById('js-plugin-confirm').innerHTML = "W pamięci przeglądarki są już zapisane dane do realizacji przelewu";
    }
  });

  /****************************************************
  * Triger
  *****************************************************/
  reciveDataCreditAgricole();
}
/****************************************************
* Check if demo.ebgz.pl - PAGE
*****************************************************/
if(pageAdres.startsWith('http://demo.ebgz.pl/')) {
  var info = document.getElementById('main');
  info.innerHTML += '<div id="dotpay-info-bank">'
                      +'<div id="js-plugin-confirm" class="plugin-confirm"></div>'
                      +'<div class="plugin-title">'
                        +'<img src="https://ssl.dotpay.pl/static_payment/images/layout/logos/logo.png" style="height: 20px" alt="doptay logo">Plugin DotPay.pl - BGŻ BNP PARIBAS'
                      +'</div> '
                    +'</div>'

  chrome.storage.sync.get('dotpayData', function(data){
    if (data.dotpayData == undefined) {
      document.getElementById('js-plugin-confirm').innerHTML = "Stan pamięci: Brak zapisanych danych w pamięci";
    }
    else {
      document.getElementById('js-plugin-confirm').innerHTML = "W pamięci przeglądarki są już zapisane dane do realizacji przelewu";
    }
  });

  /****************************************************
  * Triger
  *****************************************************/
  reciveDataBGZ();
}
