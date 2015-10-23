function reciveDataBGZ () {
  console.log('recive data - content script')
  self.port.on ('reciveData', function (data) {
    alert('dane odebrane!!!!')
    console.log('dane odebrane')
    console.log(data)
  });
  self.port.emit ('sendData', 'prośba o wysłanie danych');
  console.log('To jest koniec - nie ma już nic do odebrania')
}

var info = document.getElementById('main');
info.innerHTML += '<div id="dotpay-info-bank">'
                    +'<div id="js-plugin-confirm" class="plugin-confirm"></div>'
                    +'<div class="plugin-title">'
                      +'<img src="https://ssl.dotpay.pl/static_payment/images/layout/logos/logo.png" style="height: 20px" alt="doptay logo">Plugin DotPay.pl - Credit Agricole '
                    +'</div> '
                  +'</div>'

/****************************************************
* Triger
*****************************************************/
reciveDataBGZ();
