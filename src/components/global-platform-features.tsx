"use client";

import React from "react";
import { useGlobalModals } from "@/lib/global-modals-store";
import { CommandPalette } from "@/components/search/command-palette";
import { DeviceSyncModal } from "@/components/sync/device-sync-modal";
import { MobileBottomNav } from "@/components/navigation/mobile-bottom-nav";

export function GlobalPlatformFeatures() {
  const {
    commandPaletteOpen,
    setCommandPaletteOpen,
    syncModalOpen,
    setSyncModalOpen,
  } = useGlobalModals();

  return (
    <>
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
      />
      <DeviceSyncModal
        isOpen={syncModalOpen}
        onClose={() => setSyncModalOpen(false)}
      />
      <MobileBottomNav />
    </>
  );
}
