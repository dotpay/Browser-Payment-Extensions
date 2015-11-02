/****************************************************
* Recive data from Firefox Add-on script
*****************************************************/
function reciveDataBGZ () {
  self.port.on ('reciveDataStatus', function (data) {
      document.getElementById('js-plugin-confirm').innerHTML = data;
    });
  self.port.emit ('checkData', 'checkData');
  self.port.on ('reciveData', function (data) {
    if (data != undefined) {
      document.getElementById(configBGZ.accountNumber).value = data[0];
      document.getElementById(configBGZ.amount).value = data[1];
      document.getElementById(configBGZ.title).value = data[2];
      document.getElementById(configBGZ.name).value = data[3];
      document.getElementById(configBGZ.adresFirst).value = data[4];
      document.getElementById(configBGZ.adresSecond).value = data[5];
      document.getElementById('js-plugin-confirm').innerHTML = 'Formularz został uzupełniony, a zapisane dane zostały usunięte z pamięci przeglądarki';
      self.port.emit ('removeData', 'Remove data request');
    }
  });
  self.port.emit ('sendData', 'prośba o wysłanie danych');
}
/****************************************************
* Add to DOM
*****************************************************/
var info = document.querySelector('body').firstElementChild;
  info.innerHTML += '<div id="dotpay-info-bank">'
                    +'<div id="js-plugin-confirm" class="plugin-confirm"></div>'
                    +'<div class="plugin-title">'
                      +'<img src="https://ssl.dotpay.pl/static_payment/images/layout/logos/logo.png" style="height: 20px" alt="doptay logo">Plugin DotPay.pl - BGŻ BNP PARIBAS'
                    +'</div> '
                  +'</div>'

/****************************************************
* Triger for recive data
*****************************************************/
reciveDataBGZ();
