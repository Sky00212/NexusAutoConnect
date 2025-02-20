// 简单的日志函数
function log(message) {
  console.log(`[Nexus Auto Connect] ${message}`);
}

// 查找并点击按钮
function findAndClickButton() {
  log('开始查找电源按钮');
  
  try {
    // 检查当前状态
    const allDivs = document.getElementsByTagName('div');
    const isDisconnected = Array.from(allDivs).some(div => 
      div.textContent?.includes('CONNECT TO NEXUS')
    );
    
    if (isDisconnected) {
      log('检测到断开状态，尝试重新连接');
      
      // 查找电源按钮
      const powerIcon = document.querySelector('img[src*="power-settings-icon.svg"]');
      if (powerIcon) {
        const button = powerIcon.closest('div[role="button"]') || 
                      powerIcon.parentElement?.closest('div[role="button"]') ||
                      powerIcon.parentElement;
        
        if (button) {
          log('找到电源按钮');
          
          try {
            button.click();
            log('点击成功');
            
            return new Promise((resolve) => {
              let checkAttempts = 0;
              const maxCheckAttempts = 10;
              
              const checkStatus = setInterval(() => {
                checkAttempts++;
                const connected = Array.from(document.getElementsByTagName('div')).some(div => 
                  div.textContent?.includes('CONNECTED')
                );
                
                if (connected) {
                  log('连接成功');
                  clearInterval(checkStatus);
                  resolve(true);
                } else if (checkAttempts >= maxCheckAttempts) {
                  log('等待状态变化超时');
                  clearInterval(checkStatus);
                  resolve(false);
                }
              }, 1000);
            });
          } catch (error) {
            log('点击失败: ' + error.message);
          }
        }
      }
    } else {
      log('当前已连接');
      return true;
    }
    
    log('未找到电源按钮');
  } catch (error) {
    log('查找按钮时出错: ' + error.message);
  }
  
  return false;
}

// 等待页面加载
function waitForElement(timeout = 5000) {
  return new Promise((resolve) => {
    const check = () => {
      const elements = document.getElementsByTagName('div');
      for (const el of elements) {
        if (el.textContent?.includes('CONNECT TO NEXUS')) {
          return true;
        }
      }
      return false;
    };
    
    if (check()) {
      resolve();
      return;
    }
    
    const observer = new MutationObserver((mutations, obs) => {
      if (check()) {
        obs.disconnect();
        resolve();
      }
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    
    setTimeout(() => {
      observer.disconnect();
      resolve();
    }, timeout);
  });
}

// 定期检查函数
async function startChecking() {
  let attempts = 0;
  const maxAttempts = 9999999; // 增加检查次数
  const interval = 3000;
  
  log('开始定期检查');
  
  const check = setInterval(async () => {
    attempts++;
    log(`第 ${attempts} 次检查`);
    
    const result = await findAndClickButton();
    if (result) {
      log('按钮操作成功，继续监控'); // 修改为继续监控
      // 不再清除 interval，持续检查
    }
  }, interval);
}

// 监听来自 background.js 的消息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "clickPowerButton") {
    log('收到点击请求');
    startChecking();
  }
});

// 页面加载后启动
log('content script 已加载');
setTimeout(startChecking, 5000);