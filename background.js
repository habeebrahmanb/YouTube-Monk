// Service Worker for YouTube Monk

chrome.runtime.onInstalled.addListener(() => {
  console.log("YouTube Monk Extension Installed");
});

// Handle downloads and complex tasks if necessary
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'downloadFile') {
    chrome.downloads.download({
      url: request.url,
      filename: request.filename
    }, (downloadId) => {
      sendResponse({ success: true, downloadId });
    });
    return true;
  }
});
