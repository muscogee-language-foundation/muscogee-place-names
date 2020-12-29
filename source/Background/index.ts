// This file was taken from https://github.com/mdn/webextensions-examples/tree/master/emoji-substitution

import { browser } from "webextension-polyfill-ts";

export type Message = "on" | "off";

const tabs: Map<number, "on" | "off"> = new Map();

browser.browserAction.onClicked.addListener((tab) => {
  const tabId = tab.id;
  if (tabId) {
    const toggle = tabs.get(tabId);

    if (toggle === undefined || toggle === "off") {
      tabs.set(tabId, "on");
      browser.tabs.sendMessage(tabId, "on");
    } else {
      tabs.set(tabId, "off");
      browser.tabs.reload(tabId);
    }
  }
});
