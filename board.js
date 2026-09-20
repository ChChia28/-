// 公共榜后端 —— Vercel Serverless Function
// 依赖 Upstash Redis：在 Vercel Storage 面板装 Marketplace → Upstash Redis
// 环境变量 KV_REST_API_URL 和 KV_REST_API_TOKEN 会被自动注入

import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();
const KEY = 'flaked:board';
const TTL_DAYS = 30;
const MAX_ENTRIES = 200;   // 榜单上限
const NAME_MAX = 24;
const UID_MAX = 40;

function bad(res, code, msg) {
  return res.status(code).json({ error: msg });
}

function clean(body) {
  const uid = String(body.uid || '').slice(0, UID_MAX).replace(/[^\w\-]/g, '');
  const name = String(body.name || '').slice(0, NAME_MAX).trim();
  const avatar = String(body.avatar || '🫵').slice(0, 8);
  const pts = Math.max(0, Math.min(999999, parseInt(body.pts) || 0));
  const streak = Math.max(0, Math.min(9999, parseInt(body.streak) || 0));
  return { uid, name, pts, streak, avatar, ts: Date.now() };
}

export default async function handler(req, res) {
  // CORS —— 允许任何 origin 读写这个榜（如果你想收紧就改成你自己的域名）
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    // ============ GET /api/board —— 拉所有人 ============
    if (req.method === 'GET') {
      const all = await redis.hgetall(KEY) || {};
      const cutoff = Date.now() - TTL_DAYS * 86400 * 1000;
      const users = [];
      for (const uid in all) {
        const raw = all[uid];
        const p = typeof raw === 'string' ? JSON.parse(raw) : raw;
        if (p && p.ts && p.ts > cutoff) users.push(p);
      }
      users.sort((a, b) => b.pts - a.pts);
      return res.status(200).json({ users: users.slice(0, MAX_ENTRIES) });
    }

    // ============ POST /api/board —— 更新自己 ============
    if (req.method === 'POST') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
      if (!body.uid || !body.name) return bad(res, 400, 'missing uid or name');
      const data = clean(body);
      if (!data.uid || !data.name) return bad(res, 400, 'invalid uid or name');
      await redis.hset(KEY, { [data.uid]: JSON.stringify(data) });
      return res.status(200).json({ ok: true });
    }

    // ============ DELETE /api/board?uid=xxx —— 下榜 ============
    if (req.method === 'DELETE') {
      const uid = req.query?.uid || (typeof req.body === 'object' && req.body?.uid);
      if (!uid) return bad(res, 400, 'missing uid');
      await redis.hdel(KEY, String(uid).slice(0, UID_MAX));
      return res.status(200).json({ ok: true });
    }

    return bad(res, 405, 'method not allowed');
  } catch (e) {
    return bad(res, 500, String(e?.message || e));
  }
}
