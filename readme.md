Dotpay Chrome plugin v 1.0.0 - beta
=====

## Instalacja testowa:

* W prawym górnym rogu w przeglądarce chrome klikamy w ikone do ustawien, a nastepnie wybieramy z listy settings.
* Z lewego menu wybieramy extensions i zaznaczmy na gorze 'developer mode'
* Nastepnie kilikamy 'load unpacked extensions' i wskazujemy glowny folder
* Wtyczka aktywuje sie na stronach obu bankow oraz na stonie dotpay-a zwiazanej z tymi bankami.

## Konfiguracja/Edycja Pluginu:
Podstawowa konfiguracja znajduje się w pliku dotpay-info.js - sekcja "Configuration", tam odpowiednio parametry:

newWindowURL - link który zostanie otwarty w nowe zakładce po kliknięciu "Zapisz dane do przelewu oraz idź do strony baku"
initialBankURL - adres strony na której zostanie dodany plugin uzupełniający formularz zapisanymi wcześniej danymi (mechanizm rozpoznaje adres strony podany w parametrze initialBankURL i wyświetla plugin dla wszystkich stron które zaczynają się od podanej wartości).
accountNumber - ID pola odpowiadającego za numer konta
amount - ​ID pola odpowiadającego za sumę przelewu
title - ​ID pola odpowiadającego za tytuł przelewu
name: ​ID pola będącego "imieniem przelewu" (np. Dotpay)
adresFirst: ​ID pola odpowiadającego pierwszej części adresu
adresSecond: ​ID pola odpowiadającego drugiej części adresu

## Umieszczenie pluginu w WebStore:
Procedura wgrać plugin do WebStore Chrome opisana jest na stronie https://developer.chrome.com/webstore/get_started_simple (od pkt. 5).
