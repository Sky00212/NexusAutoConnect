https://x.com/djqqqcom 关注我！！

# Nexus Auto Connect 自动重连工具

一个 Chrome 扩展，用于自动监控和重连 Nexus 网络连接。当检测到连接断开时，会自动尝试重新连接。



## 功能特点

- 自动检测连接状态
- 断开时自动重连
- 持续监控连接
- 支持手动触发重连
- 状态日志输出

## 安装步骤

1. 下载代码 

bash
git clone https://github.com/your-username/nexus-auto-connect.git


2. 在 Chrome 浏览器中安装
   - 打开 Chrome 浏览器
   - 进入扩展管理页面：`chrome://extensions/`
   - 开启右上角的"开发者模式"
   - 点击"加载已解压的扩展程序"
   - 选择项目文件夹

## 使用说明

1. 安装扩展后，在工具栏会出现扩展图标
2. 访问 https://app.nexus.xyz/
3. 扩展会自动开始监控连接状态
4. 如果连接断开，会自动尝试重连
5. 点击扩展图标可以手动触发重连检查

## 文件结构
nexus-auto-connect/
├── manifest.json # 扩展配置文件
├── background.js # 后台服务脚本
├── content.js # 内容脚本
└── README.md # 说明文档


## 配置说明

如需修改配置，可以调整以下参数：

- `content.js` 中的 `interval`：检查间隔时间（默认 3000ms）
- `content.js` 中的 `maxCheckAttempts`：单次重连尝试次数（默认 10）

## 注意事项

1. 请确保浏览器已启用 JavaScript
2. 需要开启 Chrome 开发者模式才能安装本地扩展
3. 扩展仅在 https://app.nexus.xyz/ 域名下运行

## 问题反馈

如有问题或建议，请提交 Issue 或 Pull Request。

## 许可证

[MIT License](LICENSE)
