# 鸽了吗 · Flaked

Single-file HTML habit tracker with dark-humor roasts.
单文件 HTML 打卡应用，主打黑色幽默。

## 部署（只需一个文件）

图标已经内联到 `index.html` 里，所以**只需要上传这一个文件**：

- **GitHub Pages**（推荐，永远免费公开）：把 `index.html` 传到你的 repo 根目录，Settings → Pages → Source: `main` / `root`，打开生成的 `https://<用户名>.github.io/<repo>/`
- **Vercel**（有坑）：默认开启部署保护，别人访问要登录。修法：Settings → Deployment Protection → 关掉 Vercel Authentication；并使用生产 URL 而非预览 URL
- **本地**：直接双击 index.html 用浏览器打开也能用

## 数据存哪

用户浏览器的 localStorage，关掉重开也在。

**要注意**：
- 无痕/隐私模式打开的话，localStorage 会禁用，数据存不下来
- 清"浏览数据"会一起删掉，等于删档
- 定期用「设置 → 数据 → 导出全部数据」下载 JSON 备份

## 添加到手机主屏

**iOS Safari**：分享 → 添加到主屏幕 → 图标是那只"在路上"的鸽子
**Android Chrome**：菜单 → 添加到主屏幕 → 同样有图标

## 文件

```
index.html    # 全部代码 + 图标（约 580KB，图标已内联）
```

其他辅助文件（`icon-*.png`, `manifest.json`, `apple-touch-icon.png`, `favicon-32.png`）是**可选**的——留着或删掉都不影响功能。

## MIT License
