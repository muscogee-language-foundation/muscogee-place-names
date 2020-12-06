// This file was taken from https://github.com/mdn/webextensions-examples/tree/master/emoji-substitution

import { sortedMap as map } from "./placeNames";

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
      // @ts-ignore If content exists then replace it, otherwise do nothing
      content = content?.replace(regex, creek);
    }

    node.textContent = content;
  } else {
    for (let i = 0; i < node.childNodes.length; i++) {
      replaceText(node.childNodes[i]);
    }
  }
}

replaceText(document.body);

const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.addedNodes && mutation.addedNodes.length > 0) {
      for (let i = 0; i < mutation.addedNodes.length; i++) {
        const newNode = mutation.addedNodes[i];
        replaceText(newNode);
      }
    }
  });
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});
