'use strict'

chrome.runtime.onMessage.addListener((message, sender, reply) => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { text: 'report_back' }, reply);
  });

  return true;
});