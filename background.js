// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
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

chrome.runtime.onInstalled.addListener(function(details) {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([rule2]);
    chrome.declarativeContent.onPageChanged.addRules([rule1]);
  });
});

chrome.runtime.onMessage.addListener(
function(request, sender, sendResponse) {
  console.log(request);
  chrome.storage.sync.set({'myData': request}, function(){
    console.log('Sukces!!!');
  });
});
