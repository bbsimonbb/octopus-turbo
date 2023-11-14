var backgroundPageConnection
if (typeof(chrome) !== "undefined" && chrome.runtime) {
  backgroundPageConnection = chrome.runtime.connect({
    name: "panel",
  })
  backgroundPageConnection.postMessage({
    name: "init",
    tabId: chrome.devtools.inspectedWindow.tabId,
  })
}

export default backgroundPageConnection
