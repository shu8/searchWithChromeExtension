"use strict";

var maxHistoryVar;
var History = [];

chrome.storage.sync.get('maxHistory', function (items) {
    maxHistoryVar = items.maxHistory; // save maxHistory in new variable
    console.log(maxHistoryVar);
});

function historyLimit() {
    console.log(maxHistoryVar);
    if (History.length === maxHistoryVar) {
        alert("You have reached the limit for your History storage. All previous entries will be removed!");
        History = []; // Empty history array
    }
    console.log(maxHistoryVar);
}

function withBing(info, tab) {
    historyLimit();
    var text = info.selectionText,
        url = "https://www.bing.com/search?q=" + encodeURIComponent(text);
    History.push(text + ' - Bing'); // add text to history
    window.open(url, '_blank'); // open search tab
}

function withGoogle(info, tab) {
    historyLimit();
    var text = info.selectionText,
        url = "https://www.google.com/search?q=" + encodeURIComponent(text);
    History.push(text + ' - Google'); // add text to history
    window.open(url, '_blank'); // open search tab
}

function withYahoo(info, tab) {
    historyLimit();
    var text = info.selectionText,
        url = "https://search.yahoo.com/search?p=" + encodeURIComponent(text);
    History.push(text + ' - Yahoo'); // add text to history
    window.open(url, '_blank'); // open search tab
}

function withAsk(info, tab) {
    historyLimit();
    var text = info.selectionText,
        url = "http://uk.ask.com/web?q=" + encodeURIComponent(text);
    History.push(text + ' - Ask'); // add text to history
    window.open(url, '_blank'); // open search tab
}

chrome.runtime.onInstalled.addListener(function () {
    var parent = chrome.contextMenus.create({ // parent 'search with'
            "title": "Search with",
            "contexts": ["all"],
            "id": "parent"
        }),
        bingChild = chrome.contextMenus.create({ // child 'bing'
            "title": "Bing",
            "parentId": "parent",
            "id": "bingChild",
            "onclick": withBing,
            "contexts": ["all"]
        }),
        googleChild = chrome.contextMenus.create({ // child 'google'
            "title": "Google",
            "parentId": "parent",
            "id": "googleChild",
            "onclick": withGoogle,
            "contexts": ["all"]
        }),
        yahooChild = chrome.contextMenus.create({ // child 'yahoo'
            "title": "Yahoo!",
            "parentId": "parent",
            "id": "yahooChild",
            "onclick": withYahoo,
            "contexts": ["all"]
        }),
        askChild = chrome.contextMenus.create({ // child 'ask'
            "title": "Ask",
            "parentId": "parent",
            "id": "askChild",
            "onclick": withAsk,
            "contexts": ["all"]
        });
});