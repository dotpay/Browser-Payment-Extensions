
/****************************************************
* Recive data from Firefox Add-on script
*****************************************************/
function reciveDataBGZ () {
  self.port.on ('reciveData', function (data) {
    document.getElementById('id_account_nr').value = data[0];
    document.getElementById('id_amount').value = data[1];
    document.getElementById('id_title').value = data[2];
    document.getElementById('id_name').value = data[3];
    document.getElementById('id_address1').value = data[4];
    document.getElementById('id_address2').value = data[5];
  });
  self.port.emit ('sendData', 'prośba o wysłanie danych');
}
/****************************************************
* Add to DOM
*****************************************************/
var info = document.getElementById('main');
info.innerHTML += '<div id="dotpay-info-bank">'
                    +'<div id="js-plugin-confirm" class="plugin-confirm"></div>'
                    +'<div class="plugin-title">'
                      +'<img src="https://ssl.dotpay.pl/static_payment/images/layout/logos/logo.png" style="height: 20px" alt="doptay logo">Plugin DotPay.pl - Credit Agricole '
                    +'</div> '
                  +'</div>'

/****************************************************
* Triger for recive data
*****************************************************/
reciveDataBGZ();
