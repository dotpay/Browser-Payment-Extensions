var pageAdres = window.location.href;

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

  console.log(dotpayData)

  /****************************************************
  * Display info box
  *****************************************************/
  if (img[0].href == 'http://www.bgz.pl/') {
    var info = document.getElementById('main-wrapper');
    info.innerHTML = info.innerHTML + '<div id="dotpay-info">Info od DotPay dla BGŻ <br /> ' 
                      + ' Iban: ' + iban +'<button id="send">Test Sending</button>'
                      + '<button id="clear">Clear</button></div>';
  } 
  else if (img[0].href == 'https://e-bank.credit-agricole.pl/') {
    var info = document.getElementById('main-wrapper');
    info.innerHTML += '<div id="dotpay-info">Info od DotPay dla Credit Agricole <br /> ' 
                      + 'Iban: ' + iban +'<button id="send">Test Sending</button>' 
                      + '<button id="clear">Clear</button></div>' ;
  } 
  else {
    console.log('Ten bank nie jest obsługiwany przez plugin DotPay');
  }

  /****************************************************
  * Triger
  *****************************************************/
  document.querySelector('#send').addEventListener(
  'click', sendData);
  document.querySelector('#clear').addEventListener(
  'click', clearData);
}
/****************************************************
* Check if demo.credit-agricole.pl - PAGE
*****************************************************/
if(pageAdres.startsWith('http://demo.credit-agricole.pl/')) {
   var info = document.getElementById('mainForm');
   info.innerHTML += '<div id="dotpay-info">Demo Credit Agricole <br />' 
                     +'<button id="recive">Test Recive</button><button id="clear">Clear</button></div>' ;
  //Triger
  document.querySelector('#recive').addEventListener(
  'click', reciveData);
  document.querySelector('#clear').addEventListener(
  'click', clearData);
}

/****************************************************
* Send data to plugin
*****************************************************/
function sendData(e) {
  e.preventDefault();
  chrome.runtime.sendMessage(dotpayData);
}
/****************************************************
* Recive data for plugin                                
*****************************************************/
function reciveData(e) {
  e.preventDefault();
  chrome.storage.sync.get('dotpayData', function(data){
    console.log(data)
    if (data.dotpayData != undefined) {
      document.getElementById('ben_account').value = data.dotpayData[0];
      document.getElementById('amount').value = data.dotpayData[1];
      document.getElementById('title_1').value = data.dotpayData[2];
      document.getElementById('beneficiary_1').value = data.dotpayData[3];
      document.getElementById('beneficiary_2').value = data.dotpayData[4];
      document.getElementById('beneficiary_3').value = data.dotpayData[5];
    } 
    else {
      console.log('Bufor jest pusty - proszę zapisać wcześniej dane z formularza')
    }
  });
}
/****************************************************
* Remove data for plugin                                
*****************************************************/
function clearData(e) {
  e.preventDefault();
  chrome.storage.sync.clear(function(data){
    console.log('Clear!!!')
  });
}