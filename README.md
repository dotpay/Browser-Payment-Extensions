Dotpay Firefox plugin v 1.0.0 - beta
=====

## Instalacja testowa:

* W prawym górnym rogu w przeglądarce Firefox klikamy w ikone do ustawien, a nastepnie wybieramy z listy add-ons.
* Z lewego menu wybieramy Get Add-ons - następnie po prawej stronie (na lewo od pola "Search all add-ons"), klikamy w ikonkę "narzędzia" i wybieramy "Istall add-ons from file"
* Nastepnie wybieramy wcześniej zapisany na dysku plik "@Dotpay-Firefox-1.0.0.xpi" i potwierdzamy instalację wybierając "install"
* Wtyczka aktywuje sie na stronach obu bankow oraz na stonie dotpay.pl zwiazanej z tymi bankami.

## Konfiguracja/Edycja Pluginu:
Podstawowa konfiguracja znajduje się w pliku dotpay-config.js, tam odpowiednio parametry:

newWindowURL - link który zostanie otwarty w nowe zakładce po kliknięciu "Zapisz dane do przelewu oraz idź do strony baku"
accountNumber - ID pola odpowiadającego za numer konta
amount - ​ID pola odpowiadającego za sumę przelewu
title - ​ID pola odpowiadającego za tytuł przelewu
name: ​ID pola będącego "imieniem przelewu" (np. Dotpay)
adresFirst: ​ID pola odpowiadającego pierwszej części adresu
adresSecond: ​ID pola odpowiadającego drugiej części adresu

## Umieszczenie pluginu do pobrania w add-ons Firefox:
Procedura jak umieścić plugin "do pobrania" w add-ons Firefox: https://developer.mozilla.org/en-US/Add-ons/Distribution

Procedura jak edytować/developować plugin po ewentualnej zmianie paramatrów: https://developer.mozilla.org/en-US/Add-ons/SDK/Tutorials/Getting_Started_(jpm)​ - Tworzenie pliku XPI w sekcji "Packaking Add-ons"
