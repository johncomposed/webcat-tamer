// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var optionsUrl = chrome.extension.getURL('app/index.html');

function goToOptions() {
    chrome.tabs.query({
        url: optionsUrl
    }, function(tabs) {
        if (tabs.length) {
            chrome.tabs.update(tabs[0].id, {
                active: true
            });
        }
        else {
            chrome.tabs.create({
                url: optionsUrl
            });
        }
    });

}
chrome.browserAction.onClicked.addListener(goToOptions);
//goToOptions();
