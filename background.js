var rule1 = {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { hostEquals: 'ssl.dotpay.pl', schemes: ['https'] },
            css: ["a[href='https://e-bank.credit-agricole.pl/'"]
          })
        ],
        actions: [ new chrome.declarativeContent.ShowPageAction() ]
      };
var rule2 = {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { hostEquals: 'ssl.dotpay.pl', schemes: ['https'] },
            css: ["a[href='http://www.bgz.pl/'"]
          })
        ],
        actions: [ new chrome.declarativeContent.ShowPageAction() ]
      };
var rule3 = {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { hostEquals: 'demo.credit-agricole.pl' },
          })
        ],
        actions: [ new chrome.declarativeContent.ShowPageAction() ]
      };

chrome.runtime.onInstalled.addListener(function(details) {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([rule1]);
    chrome.declarativeContent.onPageChanged.addRules([rule2]);
    chrome.declarativeContent.onPageChanged.addRules([rule3]);
  });
});

chrome.runtime.onMessage.addListener(
function(request, sender, sendResponse) {
  chrome.storage.sync.set({'dotpayData': request});
  if (request != undefined)
      sendResponse({confirm: "Stan pamięci: Dane do przelewu zostały zapisane"});
});
