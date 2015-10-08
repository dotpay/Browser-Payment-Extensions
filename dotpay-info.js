var img = document.getElementById('channel_container_').getElementsByTagName('a');
var iban = document.getElementById('iban').value;



//Display info box
if (img[0].href == 'http://www.bgz.pl/') {
  var info = document.getElementById('main-wrapper');
  info.innerHTML = info.innerHTML + '<div id="dotpay-info">Info od DotPay dla BGŻ <br /> Iban: ' 
                    + iban +'<button id="test-sending">Test Sending</button><button id="recive">Test Recive</button><button id="clear">Clear</button></div>';
} 
else if (img[0].href == 'https://e-bank.credit-agricole.pl/') {
  var info = document.getElementById('main-wrapper');
  info.innerHTML += '<div id="dotpay-info">Info od DotPay dla Credit Agricole <br /> Iban: ' 
                    + iban +'<button id="test-sending">Test Sending</button><button id="recive">Test Recive</button><button id="clear">Clear</button></div>' ;
} 
else {
  console.log('Ten bank nie jest obsługiwany przez plugin DotPay');
}

//Send data to plugin
function testRequest() {
  chrome.runtime.sendMessage(iban)
}
function recive() {
  chrome.storage.sync.get('myData', function(data){
    console.log('Recive: ' + data.myData);
  });
}
function clear() {
  chrome.storage.sync.clear(function(data){
    console.log('Clear!!!')
  });
}


//Triger
window.onload = function() {
document.querySelector('#test-sending').addEventListener(
  'click', testRequest);
document.querySelector('#recive').addEventListener(
  'click', recive);
document.querySelector('#clear').addEventListener(
  'click', clear);
}