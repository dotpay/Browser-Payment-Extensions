/****************************************************
* Recive data from Firefox Add-on script
*****************************************************/
function reciveDataCreditAgricole () {
  self.port.on ('reciveDataStatus', function (data) {
      document.getElementById('js-plugin-confirm').innerHTML = data;
    });
  self.port.emit ('checkData', 'checkData');
  self.port.on ('reciveData', function (data) {
    if (data != undefined) {
      document.getElementById(configCreditAgricole.accountNumber).value = data[0];
      document.getElementById(configCreditAgricole.amount).value = data[1];
      document.getElementById(configCreditAgricole.title).value = data[2];
      document.getElementById(configCreditAgricole.name).value = data[3];
      document.getElementById(configCreditAgricole.adresFirst).value = data[4];
      document.getElementById(configCreditAgricole.adresSecond).value = data[5];
      document.getElementById('js-plugin-confirm').innerHTML = 'Formularz został uzupełniony, a zapisane dane zostały usunięte z pamięci przeglądarki';
      self.port.emit ('removeData', 'Remove data request');
    }
  });
  self.port.emit ('sendData', 'send data request');
}
/****************************************************
* Add to DOM
*****************************************************/
var info = document.body;
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
