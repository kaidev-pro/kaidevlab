"use client";

import { generateFullBackup, restoreFullBackup } from "./unified-study-storage";

export interface UserProfile {
  id: string;
  username: string;
  name: string;
  learningTrack: "n3" | "fe" | "both";
  cadetId: string;
  createdAt?: string;
}

export interface AuthState {
  user: UserProfile | null;
  token: string | null;
  isLoggedIn: boolean;
  lastSyncedAt: string | null;
  syncStatus: "idle" | "syncing" | "synced" | "error" | "offline";
}

const AUTH_TOKEN_KEY = "kaidevlab_auth_token_v1";
const AUTH_USER_KEY = "kaidevlab_auth_user_v1";
const LAST_SYNC_KEY = "kaidevlab_last_synced_at_v1";

// Resolve API Base URL. On learn.kaidevlab.com or study.kaidevlab.com, it proxies through /api
export function getApiBaseUrl(): string {
  if (typeof window === "undefined") return "https://learn.kaidevlab.com/api";
  return window.location.origin + "/api";
}

/**
 * Returns currently stored authentication credentials from localStorage
 */
export function getStoredAuth(): AuthState {
  if (typeof window === "undefined") {
    return {
      user: null,
      token: null,
      isLoggedIn: false,
      lastSyncedAt: null,
      syncStatus: "idle",
    };
  }

  try {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    const userRaw = localStorage.getItem(AUTH_USER_KEY);
    const lastSyncedAt = localStorage.getItem(LAST_SYNC_KEY);
    const user = userRaw ? (JSON.parse(userRaw) as UserProfile) : null;

    return {
      user,
      token,
      isLoggedIn: Boolean(token && user),
      lastSyncedAt,
      syncStatus: token ? "idle" : "offline",
    };
  } catch {
    return {
      user: null,
      token: null,
      isLoggedIn: false,
      lastSyncedAt: null,
      syncStatus: "idle",
    };
  }
}

/**
 * Register a new cadet with Name and Learning Track onboarding choices
 */
export async function registerCadet(params: {
  username: string;
  password: string;
  name: string;
  learningTrack: "n3" | "fe" | "both";
}): Promise<{ success: boolean; user?: UserProfile; message?: string }> {
  try {
    const res = await fetch(`${getApiBaseUrl()}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      return { success: false, message: data.message || "Gagal mendaftarkan akun." };
    }

    // Save token & user
    localStorage.setItem(AUTH_TOKEN_KEY, data.token);
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(data.user));
    localStorage.setItem("kaidevlab_candidate_name", data.user.name);
    localStorage.setItem("kaidevlab_cadet_id", data.user.cadetId);
    if (data.user.learningTrack === "n3" || data.user.learningTrack === "fe") {
      localStorage.setItem("kaidevlab_study_active_hub", data.user.learningTrack);
    }

    // Initial sync with whatever local progress user already had as guest
    syncStudyProgressBackground();

    window.dispatchEvent(new Event("kaidevlab:auth_change"));
    window.dispatchEvent(new Event("kaidevlab:study_activity_recorded"));

    return { success: true, user: data.user };
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : "Tidak dapat terhubung ke server.",
    };
  }
}

/**
 * Login existing cadet
 */
export async function loginCadet(params: {
  username: string;
  password: string;
}): Promise<{ success: boolean; user?: UserProfile; message?: string }> {
  try {
    const res = await fetch(`${getApiBaseUrl()}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      return { success: false, message: data.message || "Username atau password salah." };
    }

    localStorage.setItem(AUTH_TOKEN_KEY, data.token);
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(data.user));
    localStorage.setItem("kaidevlab_candidate_name", data.user.name);
    localStorage.setItem("kaidevlab_cadet_id", data.user.cadetId);
    if (data.user.learningTrack === "n3" || data.user.learningTrack === "fe") {
      localStorage.setItem("kaidevlab_study_active_hub", data.user.learningTrack);
    }

    // If server provided progress, restore it
    if (data.progress) {
      restoreFullBackup(JSON.stringify({ payload: data.progress }));
    }

    localStorage.setItem(LAST_SYNC_KEY, new Date().toISOString());

    window.dispatchEvent(new Event("kaidevlab:auth_change"));
    window.dispatchEvent(new Event("kaidevlab:study_activity_recorded"));

    return { success: true, user: data.user };
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : "Tidak dapat terhubung ke server.",
    };
  }
}

/**
 * Logout
 */
export async function logoutCadet(): Promise<void> {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  if (token) {
    try {
      await fetch(`${getApiBaseUrl()}/auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    } catch {}
  }

  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(AUTH_USER_KEY);
  localStorage.removeItem(LAST_SYNC_KEY);

  window.dispatchEvent(new Event("kaidevlab:auth_change"));
}

/**
 * Update user profile (Name or Track Focus)
 */
export async function updateCadetProfile(updates: {
  name?: string;
  learningTrack?: "n3" | "fe" | "both";
}): Promise<{ success: boolean; user?: UserProfile; message?: string }> {
  const { token, user } = getStoredAuth();
  if (!token || !user) return { success: false, message: "Belum masuk." };

  try {
    const res = await fetch(`${getApiBaseUrl()}/auth/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updates),
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      return { success: false, message: data.message || "Gagal memperbarui profil." };
    }

    const updatedUser: UserProfile = { ...user, ...data.user };
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(updatedUser));
    if (updates.name) localStorage.setItem("kaidevlab_candidate_name", updates.name);
    if (updates.learningTrack && (updates.learningTrack === "n3" || updates.learningTrack === "fe")) {
      localStorage.setItem("kaidevlab_study_active_hub", updates.learningTrack);
    }

    window.dispatchEvent(new Event("kaidevlab:auth_change"));
    return { success: true, user: updatedUser };
  } catch (err) {
    return { success: false, message: "Gagal terhubung ke server." };
  }
}

/**
 * Push local study progress to cloud and merge with server state
 */
export async function syncStudyProgress(): Promise<{
  success: boolean;
  lastSyncedAt?: string;
  message?: string;
}> {
  const { token } = getStoredAuth();
  if (!token) return { success: false, message: "Belum masuk." };

  try {
    const backup = generateFullBackup();
    const res = await fetch(`${getApiBaseUrl()}/study/sync`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        payload: backup.payload,
        clientTimestamp: Date.now(),
      }),
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      return { success: false, message: data.message || "Gagal sinkronisasi." };
    }

    // If server sent merged progress, update local store with merged data
    if (data.mergedPayload) {
      restoreFullBackup(JSON.stringify({ payload: data.mergedPayload }));
    }

    const nowIso = new Date().toISOString();
    localStorage.setItem(LAST_SYNC_KEY, nowIso);

    window.dispatchEvent(new Event("kaidevlab:sync_status"));
    return { success: true, lastSyncedAt: nowIso };
  } catch (err) {
    return { success: false, message: "Koneksi offline atau server bermasalah." };
  }
}

/**
 * Pull latest study progress from cloud (e.g. after studying on another device)
 */
export async function pullStudyProgress(): Promise<{ success: boolean }> {
  const { token } = getStoredAuth();
  if (!token) return { success: false };

  try {
    const res = await fetch(`${getApiBaseUrl()}/study/pull`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    if (res.ok && data.success && data.progress) {
      restoreFullBackup(JSON.stringify({ payload: data.progress }));
      const nowIso = new Date().toISOString();
      localStorage.setItem(LAST_SYNC_KEY, nowIso);
      window.dispatchEvent(new Event("kaidevlab:study_activity_recorded"));
      window.dispatchEvent(new Event("kaidevlab:sync_status"));
      return { success: true };
    }
  } catch {}

  return { success: false };
}

// Debounced background sync timer
let syncTimer: ReturnType<typeof setTimeout> | null = null;

export function syncStudyProgressBackground(delayMs = 2500): void {
  if (typeof window === "undefined") return;
  const { token } = getStoredAuth();
  if (!token) return;

  if (syncTimer) clearTimeout(syncTimer);
  syncTimer = setTimeout(() => {
    syncStudyProgress().catch(() => {});
  }, delayMs);
}

if (typeof window !== "undefined") {
  window.addEventListener("kaidevlab:study_activity_recorded", () => {
    syncStudyProgressBackground();
  });
}

