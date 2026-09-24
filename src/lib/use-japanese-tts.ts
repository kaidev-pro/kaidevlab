"use client";

import { useState, useCallback, useEffect } from "react";
import { stripRuby } from "@/lib/fe-furigana";

export function useJapaneseTts() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [activeSpeechId, setActiveSpeechId] = useState<string | null>(null);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const stop = useCallback(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
    setActiveSpeechId(null);
  }, []);

  const speak = useCallback(
    (text: string, id?: string) => {
      if (typeof window === "undefined" || !("speechSynthesis" in window)) {
        return;
      }

      const targetId = id || text;

      // If already speaking the same target, toggle stop
      if (isSpeaking && activeSpeechId === targetId) {
        stop();
        return;
      }

      // Stop previous utterance
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
      }

      const cleanText = stripRuby(text);
      if (!cleanText.trim()) return;

      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = "ja-JP";
      utterance.rate = 0.9; // Optimal pace for non-native learners

      utterance.onstart = () => {
        setIsSpeaking(true);
        setActiveSpeechId(targetId);
      };

      utterance.onend = () => {
        setIsSpeaking(false);
        setActiveSpeechId(null);
      };

      utterance.onerror = () => {
        setIsSpeaking(false);
        setActiveSpeechId(null);
      };

      window.speechSynthesis.speak(utterance);
    },
    [isSpeaking, activeSpeechId, stop]
  );

  return {
    speak,
    stop,
    isSpeaking,
    activeSpeechId,
  };
}
