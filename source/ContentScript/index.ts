// This file was taken from https://github.com/mdn/webextensions-examples/tree/master/emoji-substitution

import { browser } from "webextension-polyfill-ts";

import { sortedMap as map } from "./placeNames";
import { Message } from "../Background/index";

let regexs = new Map();
for (let word of map.keys()) {
  regexs.set(word, new RegExp(word, "gi"));
}

function replaceText(node: Node) {
  if (node.nodeType === Node.TEXT_NODE) {
    if (node.parentNode && node.parentNode.nodeName === "TEXTAREA") {
      return;
    }

    let content = node.textContent;

    for (let [word, creek] of map) {
      const regex = regexs.get(word);

      if (content !== null) {
        content = content.replace(regex, creek);
      }
    }

    node.textContent = content;
  } else {
    node.childNodes.forEach((node) => {
      replaceText(node);
    });
  }
}

const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.addedNodes && mutation.addedNodes.length > 0) {
      mutation.addedNodes.forEach((addedNode) => {
        replaceText(addedNode);
      });
    }
  });
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});

browser.runtime.onMessage.addListener((message: Message) => {
  if (message === "on") {
    replaceText(document.body);
  }
});
