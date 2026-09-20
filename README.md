# 鸽了吗 · Flaked

Single-file HTML habit tracker with dark-humor roasts + shared leaderboard.
单文件 HTML 打卡应用 + 共享排行榜。

## 文件

```
flaked/
├── index.html          # 前端全部代码 + 图标（约 580KB）
├── api/board.js        # 公共榜后端（Vercel Serverless）
├── package.json        # 后端依赖
├── DEPLOY.md           # 部署到 Vercel 步骤（含 Upstash Redis）
└── README.md
```

## 想快速试试

单人玩：直接双击 `index.html` 打开就用，数据存在你自己的浏览器 localStorage。

## 想跟朋友一起玩排行榜

看 [DEPLOY.md](./DEPLOY.md)——部署到 Vercel + 装 Upstash Redis（都免费）。

## 数据

- **单机数据**（任务、打卡、积分、连签、照片）：浏览器 localStorage
- **公共榜数据**（昵称、积分、连签、头像）：Upstash Redis via `/api/board`

**备份**：设置页 → 数据 → 导出全部数据。换手机、清浏览器数据、升级用得着。

## MIT License
