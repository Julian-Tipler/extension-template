console.log("background 🥷");

// Initialize with default settings if not already set
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.get(["corner"], function(result) {
    if (!result.corner) {
      chrome.storage.local.set({ corner: "top-right" });
    }
  });
});
