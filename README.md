# 鸽了吗 · Flaked

A single-file, zero-backend habit-tracker that roasts you when you skip.
一个单文件、无后端的打卡 app，你鸽了它就骂你。

![preview](preview.png)

---

## 中文

### 是什么

打开就用的打卡工具，全部塞在一个 `index.html` 里，不联网、不上传。核心不是"记录习惯"，是**你没做的时候会被毒舌一句**——针对性、时不时冒出、不重样。

### 特色

- **1200+ 条毒舌文案**（中英各 600+），中文 320 条主 spicy 池，撑三年不重样
- **今日、排行、奖励、战报** 四页签
- **周 / 季 / 年三档战报**：柱状图 + 完成率 + 毒舌总结 + 下阶段处方
- **本地虚拟对手 + 可选公共榜**：默认 9 个假对手随你天数增长，可选开公共榜看别的真实用户
- **积分 / 段位 / 免鸽卡 / 徽章 / 随机盲盒**（间歇性奖励，脑科学有出处）
- **自然语言添加任务**：输入"每天晚上7点跑步30分钟"自动解析时间、目标、重复日
- **语音添加**（浏览器原生 SpeechRecognition，中英自动切）
- **打卡带笔记和照片**，照片自动压缩，聚合成"记忆墙"
- **中英完全隔离**，任意时刻可切
- **温柔模式**开关：状态不好时把毒舌换成不带刺的鼓励
- **导入 / 导出**：JSON 备份全部数据（含照片），换手机、升级不丢

### 怎么用

**本地**：把 `index.html` 直接拖进浏览器就能用。数据存在浏览器本地（IndexedDB），关了页面还在。

**部署到 GitHub Pages**：
1. 在 GitHub 建个 repo，把这些文件推上去
2. Settings → Pages → Source: `main` branch, `/root`
3. 拿到 `https://<your-name>.github.io/<repo-name>/` 就能在手机上打开
4. iOS: Safari 里打开 → 分享 → 添加到主屏幕，就变成一个像 app 的图标

### 数据

**存储**：默认存在浏览器提供的 storage 里，不联网。如果部署在 GitHub Pages 上，也只是页面本身在网上，你的数据仍然只在你自己的浏览器里。

**备份**：奖励页最下面「导出全部数据」下载一个 JSON。里面有任务、每天打卡记录、积分、连签、徽章、自定义奖励、所有照片（base64 内嵌）。换设备/升级前先导出，装新版后在同一位置「从备份文件恢复」。

### 毒舌等级

不喜欢被骂？奖励页 → 温柔模式打开。

### 用到的行为设计原理

界面里的"大脑冷知识"每张卡都有出处：蔡加尼克效应、执行意图（Implementation Intentions, Gollwitzer 1999）、习惯自动化中位数 66 天（Lally 2010）、多巴胺预期分子、损失厌恶（Kahneman-Tversky）、间歇性奖励、社会比较激活腹侧纹状体等。

### 隐私

- 默认所有数据只在你的浏览器
- 只有你主动打开「加入公共榜单」才会上传昵称/积分/连签，随时关掉即停止
- 没有分析、没有 tracking、没有广告、没有第三方脚本

---

## English

### What it is

A no-backend, single-file habit tracker. Skip a task, it roasts you — pointed, drops in unprompted, and (mostly) doesn't repeat.

### Features

- **1200+ roast lines** (600+ per language). 320 zh + 320 en in the main spicy pool alone. Won't repeat for years.
- **Four tabs**: Today, Leaderboard, Rewards, Report
- **Weekly / quarterly / yearly reports** with bar charts, completion rate, verdict, and a prescription for next period
- **Local virtual opponents + optional public board**: 9 bots grow with your install days; opt in to see real users
- **Points, ranks, skip passes, badges, loot box** (intermittent rewards — the science is real)
- **Natural language task input**: type "run 30 min at 7pm daily" and it parses time, goal, repeat
- **Voice input** using the browser's SpeechRecognition
- **Check-ins with notes and photos**, auto-compressed, aggregated into a memory wall
- **Full ZH/EN isolation**, switch anytime
- **Gentle mode** toggle: swap the roasts for kind nudges on rough days
- **Import / export**: JSON backup of everything (photos included), survives device swap / version upgrade

### How to run

**Local**: drag `index.html` into a browser. Data lives in the browser's local storage.

**GitHub Pages**:
1. Create a repo, push these files
2. Settings → Pages → Source: `main` branch, `/root`
3. Open `https://<you>.github.io/<repo>/` on your phone
4. iOS: Safari → Share → Add to Home Screen for an app-like icon

### Data

**Storage**: browser storage only, offline by default. Even when hosted on GitHub Pages, only the page is online — your data stays local.

**Backup**: Rewards tab → bottom → "Export everything" downloads a JSON with tasks, daily logs, points, streak, badges, custom rewards, and all photos (base64 embedded). Before switching devices or upgrading, export first. Then "Restore from backup" on the new install.

### Roast intensity

Don't want the abuse? Rewards tab → toggle Gentle mode.

### Behavioral principles used

Each "brain" card cites something real: Zeigarnik effect, implementation intentions (Gollwitzer 1999), median 66 days to automaticity (Lally 2010), dopamine as anticipation signal, loss aversion (Kahneman-Tversky), intermittent reinforcement, ventral striatum activation from social comparison, etc.

### Privacy

- All data local by default
- Only if you opt into the public leaderboard does your nickname/points/streak upload; turn it off anytime
- No analytics, no tracking, no ads, no third-party scripts

---

## Structure

```
.
├── index.html            # everything — HTML, CSS, JS, all in one file
├── manifest.json         # PWA manifest for Add-to-Home-Screen
├── icon-512.png          # PWA icon (large)
├── icon-192.png          # PWA icon (small)
├── apple-touch-icon.png  # iOS home screen icon (180×180)
├── favicon-32.png        # browser tab icon
├── README.md
└── LICENSE
```

**All files must sit at the repo root together** — the HTML references them by relative path.
所有文件必须一起放在仓库根目录 —— HTML 用相对路径引用它们。

## License

MIT — do whatever, no warranty. See `LICENSE`.
