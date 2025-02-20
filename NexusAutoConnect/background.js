// 监听扩展图标点击事件
chrome.action.onClicked.addListener((tab) => {
  // 检查是否在正确的网页上
  if (tab.url.includes('app.nexus.xyz')) {
    // 向内容脚本发送消息
    chrome.tabs.sendMessage(tab.id, { action: "clickPowerButton" });
  } else {
    // 如果不在正确的网页上，则打开网页
    chrome.tabs.create({ url: 'https://app.nexus.xyz/' });
  }
}); 