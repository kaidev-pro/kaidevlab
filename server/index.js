const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");

const PORT = parseInt(process.env.PORT || "4100", 10);
const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, "data");
const USERS_FILE = path.join(DATA_DIR, "users.json");
const SESSIONS_FILE = path.join(DATA_DIR, "sessions.json");
const PROGRESS_DIR = path.join(DATA_DIR, "progress");

// Ensure directories exist
fs.mkdirSync(DATA_DIR, { recursive: true });
fs.mkdirSync(PROGRESS_DIR, { recursive: true });

function safeReadJson(filePath, defaultValue) {
  try {
    if (!fs.existsSync(filePath)) return defaultValue;
    const content = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(content);
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err);
    return defaultValue;
  }
}

function safeWriteJson(filePath, data) {
  const tmpPath = `${filePath}.tmp.${Date.now()}.${Math.random().toString(36).slice(2, 7)}`;
  fs.writeFileSync(tmpPath, JSON.stringify(data, null, 2), "utf-8");
  fs.renameSync(tmpPath, filePath);
}

// In-memory caches for fast concurrent access
let usersCache = safeReadJson(USERS_FILE, []);
let sessionsCache = safeReadJson(SESSIONS_FILE, {});

function saveUsers() {
  safeWriteJson(USERS_FILE, usersCache);
}

function saveSessions() {
  safeWriteJson(SESSIONS_FILE, sessionsCache);
}

// Security: Hash password using built-in scrypt
function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const derivedKey = crypto.scryptSync(password, salt, 64);
  return `${salt}:${derivedKey.toString("hex")}`;
}

function verifyPassword(password, storedHash) {
  const [salt, key] = storedHash.split(":");
  if (!salt || !key) return false;
  const derivedKey = crypto.scryptSync(password, salt, 64);
  const keyBuf = Buffer.from(key, "hex");
  return crypto.timingSafeEqual(derivedKey, keyBuf);
}

function generateCadetId() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let suffix = "";
  for (let i = 0; i < 4; i++) {
    suffix += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `KAI-${suffix}`;
}

function findUserById(id) {
  return usersCache.find((u) => u.id === id);
}

function findUserByUsername(username) {
  const normalized = username.trim().toLowerCase();
  return usersCache.find((u) => u.username.toLowerCase() === normalized);
}

function authenticateRequest(req) {
  const authHeader = req.headers["authorization"] || "";
  const match = authHeader.match(/^Bearer\s+(.+)$/i);
  if (!match) return null;
  const token = match[1].trim();
  const session = sessionsCache[token];
  if (!session) return null;

  // Session expiry check (e.g. 90 days of inactivity)
  const now = Date.now();
  if (now - session.lastUsedAt > 90 * 24 * 60 * 60 * 1000) {
    delete sessionsCache[token];
    saveSessions();
    return null;
  }

  session.lastUsedAt = now;
  saveSessions();
  return findUserById(session.userId) || null;
}

// Smart Progress Merge Algorithm
function mergeStudyProgress(existing = {}, incoming = {}) {
  const merged = { ...existing, ...incoming };

  // 1. Tango Progress
  if (existing.kaidevlab_tango_n3_progress_v1 || incoming.kaidevlab_tango_n3_progress_v1) {
    const tOld = existing.kaidevlab_tango_n3_progress_v1 || {};
    const tNew = incoming.kaidevlab_tango_n3_progress_v1 || {};

    const mastered = Array.from(new Set([...(tOld.masteredCardIds || []), ...(tNew.masteredCardIds || [])]));
    const unlocked = Array.from(new Set([...(tOld.unlockedChapterIds || ["ch-01"]), ...(tNew.unlockedChapterIds || ["ch-01"])]));
    const scores = { ...(tOld.chapterQuizScores || {}) };

    if (tNew.chapterQuizScores) {
      for (const [ch, data] of Object.entries(tNew.chapterQuizScores)) {
        const cur = scores[ch];
        scores[ch] = {
          score: Math.max(data.score || 0, cur?.score || 0),
          total: data.total || cur?.total || 10,
          passed: Boolean(data.passed || cur?.passed),
          completedAt: data.completedAt || cur?.completedAt || new Date().toISOString().split("T")[0],
          attempts: (cur?.attempts || 0) + (data.attempts || 1),
        };
      }
    }

    merged.kaidevlab_tango_n3_progress_v1 = {
      ...tOld,
      ...tNew,
      masteredCardIds: mastered,
      unlockedChapterIds: unlocked,
      chapterQuizScores: scores,
      streak: Math.max(tOld.streak || 0, tNew.streak || 0, 1),
    };
  }

  // 2. FE Study Progress
  if (existing.fe_study_progress_v1 || incoming.fe_study_progress_v1) {
    const fOld = existing.fe_study_progress_v1 || {};
    const fNew = incoming.fe_study_progress_v1 || {};

    const mastered = Array.from(new Set([...(fOld.masteredCardIds || []), ...(fNew.masteredCardIds || [])]));
    const unlocked = Array.from(new Set([...(fOld.unlockedDeckDays || [1]), ...(fNew.unlockedDeckDays || [1])]));
    const scores = { ...(fOld.dayQuizScores || {}) };

    if (fNew.dayQuizScores) {
      for (const [day, data] of Object.entries(fNew.dayQuizScores)) {
        const cur = scores[day];
        scores[day] = {
          score: Math.max(data.score || 0, cur?.score || 0),
          total: data.total || cur?.total || 10,
          passed: Boolean(data.passed || cur?.passed),
          completedAt: data.completedAt || cur?.completedAt || new Date().toISOString().split("T")[0],
          attempts: (cur?.attempts || 0) + (data.attempts || 1),
        };
      }
    }

    merged.fe_study_progress_v1 = {
      ...fOld,
      ...fNew,
      masteredCardIds: mastered,
      unlockedDeckDays: unlocked,
      dayQuizScores: scores,
      streak: Math.max(fOld.streak || 0, fNew.streak || 0, 1),
    };
  }

  // 3. Dokkai Progress
  if (existing.kaidevlab_dokkai_n3_progress_v1 || incoming.kaidevlab_dokkai_n3_progress_v1) {
    const dOld = existing.kaidevlab_dokkai_n3_progress_v1 || {};
    const dNew = incoming.kaidevlab_dokkai_n3_progress_v1 || {};
    const completed = Array.from(new Set([...(dOld.completedPassageIds || []), ...(dNew.completedPassageIds || [])]));
    merged.kaidevlab_dokkai_n3_progress_v1 = {
      ...dOld,
      ...dNew,
      completedPassageIds: completed,
    };
  }

  // 4. Unified Activity History
  if (existing.kaidevlab_unified_study_activity_v1 || incoming.kaidevlab_unified_study_activity_v1) {
    const uOld = existing.kaidevlab_unified_study_activity_v1 || {};
    const uNew = incoming.kaidevlab_unified_study_activity_v1 || {};
    const mergedHistory = { ...uOld };

    for (const [dateStr, dayAct] of Object.entries(uNew)) {
      const cur = mergedHistory[dateStr];
      if (!cur) {
        mergedHistory[dateStr] = dayAct;
      } else {
        mergedHistory[dateStr] = {
          date: dateStr,
          dokkai: Math.max(cur.dokkai || 0, dayAct.dokkai || 0),
          tango: Math.max(cur.tango || 0, dayAct.tango || 0),
          fe: Math.max(cur.fe || 0, dayAct.fe || 0),
          bunpou: Math.max(cur.bunpou || 0, dayAct.bunpou || 0),
          total: Math.max(cur.total || 0, dayAct.total || 0),
        };
      }
    }
    merged.kaidevlab_unified_study_activity_v1 = mergedHistory;
  }

  return merged;
}

function parseJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 5 * 1024 * 1024) {
        reject(new Error("Payload too large"));
      }
    });
    req.on("end", () => {
      if (!body || !body.trim()) return resolve({});
      try {
        resolve(JSON.parse(body));
      } catch (err) {
        const error = new Error("Format JSON tidak valid");
        error.statusCode = 400;
        reject(error);
      }
    });
    req.on("error", reject);
  });
}

function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  });
  res.end(JSON.stringify(data));
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);
  const pathname = url.pathname.replace(/\/+$/, "") || "/";

  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Max-Age": "86400",
    });
    return res.end();
  }

  try {
    // HEALTH CHECK
    if (pathname === "/api/health" || pathname === "/health") {
      return sendJson(res, 200, {
        status: "ok",
        uptime: process.uptime(),
        timestamp: Date.now(),
        usersCount: usersCache.length,
      });
    }

    // 1. REGISTER
    if (pathname === "/api/auth/register" && req.method === "POST") {
      const body = await parseJsonBody(req);
      const { username, password, name, learningTrack } = body;

      if (!username || typeof username !== "string" || username.trim().length < 3) {
        return sendJson(res, 400, { success: false, message: "Username minimal 3 karakter." });
      }
      if (!password || typeof password !== "string" || password.length < 6) {
        return sendJson(res, 400, { success: false, message: "Kata sandi minimal 6 karakter." });
      }

      const existingUser = findUserByUsername(username);
      if (existingUser) {
        return sendJson(res, 409, { success: false, message: "Username sudah terdaftar. Silakan pilih username lain atau masuk." });
      }

      const cleanName = typeof name === "string" && name.trim() ? name.trim() : "Cadet";
      const track = ["n3", "fe", "both"].includes(learningTrack) ? learningTrack : "n3";
      const cadetId = generateCadetId();
      const userId = crypto.randomUUID();

      const newUser = {
        id: userId,
        username: username.trim(),
        passwordHash: hashPassword(password),
        name: cleanName,
        learningTrack: track,
        cadetId,
        createdAt: new Date().toISOString(),
      };

      usersCache.push(newUser);
      saveUsers();

      // Create session token
      const token = crypto.randomBytes(32).toString("hex");
      sessionsCache[token] = {
        userId,
        createdAt: Date.now(),
        lastUsedAt: Date.now(),
      };
      saveSessions();

      const userPublic = {
        id: newUser.id,
        username: newUser.username,
        name: newUser.name,
        learningTrack: newUser.learningTrack,
        cadetId: newUser.cadetId,
        createdAt: newUser.createdAt,
      };

      return sendJson(res, 201, {
        success: true,
        token,
        user: userPublic,
      });
    }

    // 2. LOGIN
    if (pathname === "/api/auth/login" && req.method === "POST") {
      const body = await parseJsonBody(req);
      const { username, password } = body;

      if (!username || !password) {
        return sendJson(res, 400, { success: false, message: "Username dan kata sandi wajib diisi." });
      }

      const user = findUserByUsername(username);
      if (!user || !verifyPassword(password, user.passwordHash)) {
        return sendJson(res, 401, { success: false, message: "Username atau kata sandi tidak cocok." });
      }

      const token = crypto.randomBytes(32).toString("hex");
      sessionsCache[token] = {
        userId: user.id,
        createdAt: Date.now(),
        lastUsedAt: Date.now(),
      };
      saveSessions();

      // Load user's latest cloud progress
      const userProgressFile = path.join(PROGRESS_DIR, `${user.id}.json`);
      const progress = safeReadJson(userProgressFile, null);

      const userPublic = {
        id: user.id,
        username: user.username,
        name: user.name,
        learningTrack: user.learningTrack,
        cadetId: user.cadetId,
        createdAt: user.createdAt,
      };

      return sendJson(res, 200, {
        success: true,
        token,
        user: userPublic,
        progress: progress?.payload || null,
      });
    }

    // 3. GET /api/auth/me
    if (pathname === "/api/auth/me" && req.method === "GET") {
      const user = authenticateRequest(req);
      if (!user) {
        return sendJson(res, 401, { success: false, message: "Sesi tidak valid atau telah berakhir." });
      }

      return sendJson(res, 200, {
        success: true,
        user: {
          id: user.id,
          username: user.username,
          name: user.name,
          learningTrack: user.learningTrack,
          cadetId: user.cadetId,
          createdAt: user.createdAt,
        },
      });
    }

    // 4. PUT /api/auth/profile
    if (pathname === "/api/auth/profile" && req.method === "PUT") {
      const user = authenticateRequest(req);
      if (!user) {
        return sendJson(res, 401, { success: false, message: "Sesi tidak valid." });
      }

      const body = await parseJsonBody(req);
      if (typeof body.name === "string" && body.name.trim()) {
        user.name = body.name.trim();
      }
      if (["n3", "fe", "both"].includes(body.learningTrack)) {
        user.learningTrack = body.learningTrack;
      }
      user.updatedAt = new Date().toISOString();
      saveUsers();

      return sendJson(res, 200, {
        success: true,
        user: {
          id: user.id,
          username: user.username,
          name: user.name,
          learningTrack: user.learningTrack,
          cadetId: user.cadetId,
        },
      });
    }

    // 5. POST /api/study/sync
    if (pathname === "/api/study/sync" && req.method === "POST") {
      const user = authenticateRequest(req);
      if (!user) {
        return sendJson(res, 401, { success: false, message: "Harap masuk untuk menyinkronkan." });
      }

      const body = await parseJsonBody(req);
      const incomingPayload = body.payload || {};

      const userProgressFile = path.join(PROGRESS_DIR, `${user.id}.json`);
      const existingRecord = safeReadJson(userProgressFile, { payload: {} });

      const mergedPayload = mergeStudyProgress(existingRecord.payload || {}, incomingPayload);

      safeWriteJson(userProgressFile, {
        userId: user.id,
        cadetId: user.cadetId,
        updatedAt: Date.now(),
        payload: mergedPayload,
      });

      return sendJson(res, 200, {
        success: true,
        mergedPayload,
        serverTimestamp: Date.now(),
      });
    }

    // 6. GET /api/study/pull
    if (pathname === "/api/study/pull" && req.method === "GET") {
      const user = authenticateRequest(req);
      if (!user) {
        return sendJson(res, 401, { success: false, message: "Harap masuk." });
      }

      const userProgressFile = path.join(PROGRESS_DIR, `${user.id}.json`);
      const existingRecord = safeReadJson(userProgressFile, { payload: {} });

      return sendJson(res, 200, {
        success: true,
        progress: existingRecord.payload || {},
      });
    }

    // 7. POST /api/auth/logout
    if (pathname === "/api/auth/logout" && req.method === "POST") {
      const authHeader = req.headers["authorization"] || "";
      const match = authHeader.match(/^Bearer\s+(.+)$/i);
      if (match) {
        delete sessionsCache[match[1].trim()];
        saveSessions();
      }
      return sendJson(res, 200, { success: true });
    }

    // 404
    return sendJson(res, 404, { success: false, message: "Endpoint tidak ditemukan." });
  } catch (err) {
    console.error("Server error:", err);
    return sendJson(res, err.statusCode || 500, {
      success: false,
      message: err.message || "Terjadi kesalahan internal server.",
    });
  }
});

server.listen(PORT, "127.0.0.1", () => {
  console.log(`Kaidevlab Auth & Sync service running on http://127.0.0.1:${PORT}`);
});
