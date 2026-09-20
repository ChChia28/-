# 部署到 Vercel（含公共榜后端）

## 你需要做的

### 1. 把这些文件推到 GitHub

```
flaked/
├── index.html          ← 前端（图标已内联）
├── api/
│   └── board.js        ← 公共榜后端
├── package.json        ← 依赖声明
├── README.md
└── DEPLOY.md           ← 这个文件
```

方法：在 GitHub 建个 repo，把整个 `flaked-app/` 里的东西上传上去（`flaked-app` 这层文件夹**不要**一起上传，里面的东西直接推到 repo 根）。

### 2. 在 Vercel 部署这个 repo

1. Vercel Dashboard → Add New Project → Import 你刚才的 GitHub repo
2. Framework Preset 保持 **Other**（Vercel 会自动识别 `api/*.js` 是 serverless function）
3. Root Directory 保持默认（就是根）
4. Deploy

第一次部署会失败或跑成"公共榜没数据"，因为还没建 Redis。往下走。

### 3. 装 Upstash Redis（免费）

1. 进入你刚部署好的项目 → 顶部导航栏 → **Storage**
2. 点 **Create Database** → 弹出的 Marketplace 里选 **Upstash** → **Serverless Redis**
3. 选免费 plan（Fixed，$0/mo，够 30k 命令/月）
4. 起个名字（比如 `flaked-board`），选个离你近的 Region（新加坡/东京都行）
5. Create → Vercel 会自动把 `KV_REST_API_URL`、`KV_REST_API_TOKEN` 环境变量注入到你的项目

### 4. 重新部署

在 Vercel 项目的 Deployments 页面，找到最新那次部署，右上角 `⋯` → **Redeploy**。这次会带上环境变量。

### 5. 关掉 Deployment Protection

Project → Settings → Deployment Protection → **Vercel Authentication 关成 Disabled** → Save

否则别人打开还是要登录。

### 6. 分享 URL

你的公开地址是 `flaked-<你的用户名>.vercel.app` 或者自定义域名。

## 你朋友需要做的

1. 打开你的 Vercel URL（一次就够，不用装什么）
2. 加到主屏（会看到那只在路上的鸽子图标）
3. 排行页 → 打开「加入公共榜单」toggle → 输入昵称
4. 你在你的手机上做同样的事
5. 双方都会看到对方 + 分数、连签、头像

## 数据流

```
你手机 ──POST /api/board──→ Vercel Function ──HSET──→ Upstash Redis
你朋友手机 ──GET /api/board──→ Vercel Function ──HGETALL──→ Upstash Redis
```

## 榜单规则

- 30 天没打开这个 app 的自动从榜里消失
- 最多 200 个人同时上榜（够个人小圈子）
- 昵称最长 24 字
- 名字/积分/连签在服务器端做了限制，防止有人往里灌垃圾

## 排查

- **打开公共榜后 toast 显示"服务器连不上"**：Upstash Redis 没建，或环境变量没注入。检查 Vercel → Project → Settings → Environment Variables，应该有 `KV_REST_API_URL` 和 `KV_REST_API_TOKEN`
- **你朋友看不到你**：她的浏览器缓存了旧版本。她清一下缓存或用无痕打开一次；确认你俩打开的是**同一个 Vercel 域名**
- **别人的头像变成 🙂**：那个人还没设过头像，用默认的
