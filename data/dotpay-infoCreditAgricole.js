
/****************************************************
* Recive data from Firefox Add-on script
*****************************************************/
function reciveDataCreditAgricole () {
  self.port.on ('reciveData', function (data) {
    document.getElementById('ben_account').value = data[0];
    document.getElementById('amount').value = data[1];
    document.getElementById('title_1').value = data[2];
    document.getElementById('beneficiary_1').value = data[3];
    document.getElementById('beneficiary_2').value = data[4];
    document.getElementById('beneficiary_3').value = data[5];
  });
  self.port.emit ('sendData', 'send data request');
}
/****************************************************
* Add to DOM
*****************************************************/
var info = document.getElementById('mainForm');
  info.innerHTML += '<div id="dotpay-info-bank">'
                      +'<div id="js-plugin-confirm" class="plugin-confirm"></div>'
                      +'<div class="plugin-title">'
                        +'<img src="https://ssl.dotpay.pl/static_payment/images/layout/logos/logo.png" style="height: 20px" alt="doptay logo">Plugin DotPay.pl - Credit Agricole '
                      +'</div> '
                    +'</div>'

/****************************************************
* Triger for recive data
*****************************************************/
reciveDataCreditAgricole();
