chrome.browserAction.onClicked.addListener(function() {
  chrome.tabs.create({url: "https://github.com/greggman/webgl-conformance-test-helper-extension/"});
});

chrome.runtime.onMessageExternal.addListener(function(request, sender, sendResponse) {
  if (request.takeScreenshot) {
    chrome.tabs.captureVisibleTab(/*sender.tab.windowId,*/ {format: "png"}, function(screenshotUrl) {
      sendResponse({
          url: screenshotUrl,
      });
    });
  }
  return true;
});
