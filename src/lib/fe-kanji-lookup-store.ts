"use client";

import { useState, useEffect } from "react";
import { lookupFeTerm, VocabEntry } from "./fe-vocab-glossary";
import { triggerHaptic } from "./haptics";
import { playTapSound } from "./global-sound";

interface LookupState {
  isOpen: boolean;
  term: VocabEntry | null;
}

let globalState: LookupState = {
  isOpen: false,
  term: null,
};

const listeners = new Set<(state: LookupState) => void>();

export function openKanjiLookup(
  kanji: string,
  furigana?: string,
  context?: "dokkai" | "tango" | "fe" | "auto"
) {
  triggerHaptic("light");
  playTapSound();
  const term = lookupFeTerm(kanji, furigana, context);
  globalState = {
    isOpen: true,
    term,
  };
  listeners.forEach((l) => l(globalState));
}

export function closeKanjiLookup() {
  globalState = {
    ...globalState,
    isOpen: false,
  };
  listeners.forEach((l) => l(globalState));
}

export function useKanjiLookup() {
  const [state, setState] = useState<LookupState>(globalState);

  useEffect(() => {
    listeners.add(setState);
    return () => {
      listeners.delete(setState);
    };
  }, []);

  return {
    ...state,
    open: openKanjiLookup,
    close: closeKanjiLookup,
  };
}
