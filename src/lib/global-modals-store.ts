"use client";

import { useEffect, useState } from "react";

const EVENT_OPEN_COMMAND_PALETTE = "kaidevlab:open_command_palette";
const EVENT_OPEN_SYNC_MODAL = "kaidevlab:open_sync_modal";

export function openCommandPalette(): void {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(EVENT_OPEN_COMMAND_PALETTE));
  }
}

export function openSyncModal(): void {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(EVENT_OPEN_SYNC_MODAL));
  }
}

export function useGlobalModals() {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [syncModalOpen, setSyncModalOpen] = useState(false);

  useEffect(() => {
    const handleOpenCommand = () => setCommandPaletteOpen(true);
    const handleOpenSync = () => setSyncModalOpen(true);

    window.addEventListener(EVENT_OPEN_COMMAND_PALETTE, handleOpenCommand);
    window.addEventListener(EVENT_OPEN_SYNC_MODAL, handleOpenSync);

    // Also support global Ctrl+K / Cmd+K shortcut
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener(EVENT_OPEN_COMMAND_PALETTE, handleOpenCommand);
      window.removeEventListener(EVENT_OPEN_SYNC_MODAL, handleOpenSync);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return {
    commandPaletteOpen,
    setCommandPaletteOpen,
    syncModalOpen,
    setSyncModalOpen,
  };
}
