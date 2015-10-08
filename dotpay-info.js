var img = document.getElementById('channel_container_').getElementsByTagName('a');
var iban = document.getElementById('iban').value;



//Display info box
if (img[0].href == 'http://www.bgz.pl/') {
  var info = document.getElementById('main-wrapper');
  info.innerHTML = info.innerHTML + '<div id="dotpay-info">Info od DotPay dla BGŻ <br /> Iban: ' 
                    + iban +'<button id="test-sending">Test Sending</div>';
} 
else if (img[0].href == 'https://e-bank.credit-agricole.pl/') {
  var info = document.getElementById('main-wrapper');
  info.innerHTML += '<div id="dotpay-info">Info od DotPay dla Credit Agricole <br /> Iban: ' 
                    + iban +'<button id="test-sending">Test Sending</div>' ;
} 
else {
  console.log('Ten bank nie jest obsługiwany przez plugin DotPay');
}

//Send data to plugin
function testRequest() {
  chrome.runtime.sendMessage('To jest Request!!!');
}


//Triger
document.querySelector('#test-sending').addEventListener(
  'click', testRequest);