"use client";

export type HapticType = "light" | "medium" | "heavy" | "success" | "warning" | "error";

const HAPTIC_SETTING_KEY = "kaidevlab_haptic_enabled_v1";

export function isHapticSupported(): boolean {
  return typeof window !== "undefined" && typeof window.navigator !== "undefined" && "vibrate" in window.navigator;
}

export function getHapticEnabled(): boolean {
  if (typeof window === "undefined") return true;
  try {
    const val = localStorage.getItem(HAPTIC_SETTING_KEY);
    return val !== "false";
  } catch {
    return true;
  }
}

export function setHapticEnabled(enabled: boolean): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(HAPTIC_SETTING_KEY, enabled ? "true" : "false");
  } catch {}
}

/**
 * Triggers a subtle tactile haptic vibration on mobile devices (Android / iOS with vibrate support)
 */
export function triggerHaptic(type: HapticType = "light"): void {
  if (!isHapticSupported() || !getHapticEnabled()) return;

  try {
    switch (type) {
      case "light":
        window.navigator.vibrate(12);
        break;
      case "medium":
        window.navigator.vibrate(22);
        break;
      case "heavy":
        window.navigator.vibrate(40);
        break;
      case "success":
        window.navigator.vibrate([15, 40, 25]);
        break;
      case "warning":
        window.navigator.vibrate([25, 35, 25]);
        break;
      case "error":
        window.navigator.vibrate([35, 50, 40]);
        break;
      default:
        window.navigator.vibrate(12);
    }
  } catch {
    // Ignore any browser permission or policy restrictions
  }
}
