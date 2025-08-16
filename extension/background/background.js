chrome.runtime.onMessageExternal.addListener(
  (request, sender, sendResponse) => {
    switch (request.action) {
      case "saveYourMomSessionToken":
        saveYourMomSessionToken(request.token);
        if (request.token) {
          sendResponse({ success: true, message: "Token has been received" });
        } else {
          console.error("Token is empty");
          sendResponse({ success: false, message: "Token is empty" });
        }
        break;
      case "removeYourMomSessionToken":
        removeYourMomSessionToken();
        sendResponse({ success: true, message: "Token has been removed" });
        break;
    }
    return true;
  }
);

function saveYourMomSessionToken(token) {
  chrome.storage.local.set({ yourMomSessionToken: token }, function() {});
}

function removeYourMomSessionToken() {
  chrome.storage.local.set({ yourMomSessionToken: null }, function() {});
}
