"use client";

import React, { useState, useMemo, useRef } from "react";
import {
  BookOpen,
  Volume2,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Eye,
  EyeOff,
  Languages,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  RotateCcw,
  Layers,
  Clock,
  ArrowRight,
  List,
  Compass,
} from "lucide-react";
import {
  TangoReadingPassage,
  TANGO_N3_READINGS,
  TANGO_N3_CARDS,
  TangoN3Card,
} from "@/data/tango-n3-data";
import { RubyTerm } from "@/components/fe-study/ruby-term";
import { useJapaneseTts } from "@/lib/use-japanese-tts";

interface TangoReadingViewProps {
  onSelectCardDetail?: (card: TangoN3Card) => void;
}

export function TangoReadingView({ onSelectCardDetail }: TangoReadingViewProps) {
  const { speak, activeSpeechId } = useJapaneseTts();
  const [selectedStoryId, setSelectedStoryId] = useState<string>("reading-01");
  const [selectedPartFilter, setSelectedPartFilter] = useState<string>("all");
  const [mobileTab, setMobileTab] = useState<"reader" | "list">("reader");
  const [showFurigana, setShowFurigana] = useState(true);
  const [showTranslation, setShowTranslation] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [hasSubmittedAnswer, setHasSubmittedAnswer] = useState(false);
  const [inspectedWord, setInspectedWord] = useState<TangoN3Card | null>(null);

  const readerTopRef = useRef<HTMLDivElement>(null);

  // Filter stories based on part filter
  const filteredStories = useMemo(() => {
    if (selectedPartFilter === "all") return TANGO_N3_READINGS;
    return TANGO_N3_READINGS.filter((r) => r.partId === selectedPartFilter);
  }, [selectedPartFilter]);

  // Active story lookup
  const activeStory = useMemo(() => {
    return (
      TANGO_N3_READINGS.find((r) => r.id === selectedStoryId) ||
      filteredStories[0] ||
      TANGO_N3_READINGS[0]
    );
  }, [selectedStoryId, filteredStories]);

  const currentStoryIndex = useMemo(() => {
    return TANGO_N3_READINGS.findIndex((r) => r.id === activeStory.id);
  }, [activeStory.id]);

  function handleSelectStory(id: string) {
    setSelectedStoryId(id);
    setSelectedAnswer(null);
    setHasSubmittedAnswer(false);
    setShowTranslation(false);
    setShowQuiz(false);
    setInspectedWord(null);
    setMobileTab("reader");

    if (typeof window !== "undefined") {
      readerTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  function handlePrevStory() {
    if (currentStoryIndex > 0) {
      handleSelectStory(TANGO_N3_READINGS[currentStoryIndex - 1].id);
    }
  }

  function handleNextStory() {
    if (currentStoryIndex < TANGO_N3_READINGS.length - 1) {
      handleSelectStory(TANGO_N3_READINGS[currentStoryIndex + 1].id);
    }
  }

  function handleCheckAnswer() {
    if (selectedAnswer !== null) {
      setHasSubmittedAnswer(true);
    }
  }

  function handleResetQuiz() {
    setSelectedAnswer(null);
    setHasSubmittedAnswer(false);
  }

  const currentQuiz = activeStory.comprehensionQuestions?.[0];
  const isAnswerCorrect = hasSubmittedAnswer && selectedAnswer === currentQuiz?.correctIndex;

  return (
    <div ref={readerTopRef} className="space-y-6">
      {/* Top Banner */}
      <div className="p-5 sm:p-6 rounded-3xl border border-[var(--border-subtle)] bg-gradient-to-br from-[var(--surface-primary)] to-[var(--surface-secondary)]/50 shadow-sm relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] text-xs font-bold">
              <BookOpen className="w-3.5 h-3.5" />
              <span>「読んでみよう」20 Cerita Latihan Membaca Tango N3</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-[var(--text-primary)] tracking-tight">
              Latihan Membaca Wacana Kontekstual
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-2xl leading-relaxed">
              Kuasai 1.800 kosakata N3 di dalam wacana paragraf nyata. Dilengkapi audio penutur asli (TTS), furigana toggle, terjemahan Indonesia, dan kuis pemahaman model ujian JLPT Dokkai.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setShowFurigana(!showFurigana)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                showFurigana
                  ? "bg-[var(--brand-primary)]/10 border-[var(--brand-primary)]/30 text-[var(--brand-primary)]"
                  : "bg-[var(--surface-primary)] border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
              title="Aktif/Nonaktifkan Furigana untuk melatih kanji"
            >
              {showFurigana ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
              <span>Furigana {showFurigana ? "ON" : "OFF"}</span>
            </button>
          </div>
        </div>

        {/* Mobile View Switcher (Only visible on mobile / tablet < lg) */}
        <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-[var(--border-subtle)]/70 lg:hidden">
          <button
            onClick={() => setMobileTab("reader")}
            className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
              mobileTab === "reader"
                ? "bg-[var(--brand-primary)] text-white shadow-xs"
                : "bg-[var(--surface-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Baca Cerita ({activeStory.badge})</span>
          </button>
          <button
            onClick={() => setMobileTab("list")}
            className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
              mobileTab === "list"
                ? "bg-[var(--brand-primary)] text-white shadow-xs"
                : "bg-[var(--surface-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            <List className="w-4 h-4" />
            <span>Pilih Cerita (20 Cerita)</span>
          </button>
        </div>
      </div>

      {/* Main Split Layout: Left Story Directory + Right Active Story Reader */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Story Directory / List */}
        <div
          className={`space-y-4 lg:col-span-4 ${
            mobileTab === "list" ? "block" : "hidden lg:block"
          }`}
        >
          {/* Part Filter Pills */}
          <div className="p-3 rounded-2xl bg-[var(--surface-primary)] border border-[var(--border-subtle)] space-y-2">
            <div className="text-[11px] font-bold text-[var(--text-tertiary)] uppercase tracking-wider flex items-center gap-1.5 px-1">
              <Layers className="w-3.5 h-3.5 text-[var(--brand-primary)]" />
              <span>Filter Berdasarkan Part:</span>
            </div>
            <div className="flex flex-wrap items-center gap-1 text-xs">
              <button
                onClick={() => setSelectedPartFilter("all")}
                className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                  selectedPartFilter === "all"
                    ? "bg-[var(--brand-primary)] text-white shadow-xs"
                    : "bg-[var(--surface-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                Semua (20)
              </button>
              <button
                onClick={() => setSelectedPartFilter("noun")}
                className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                  selectedPartFilter === "noun"
                    ? "bg-[var(--brand-primary)] text-white shadow-xs"
                    : "bg-[var(--surface-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                名詞 (12)
              </button>
              <button
                onClick={() => setSelectedPartFilter("verb")}
                className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                  selectedPartFilter === "verb"
                    ? "bg-[var(--brand-primary)] text-white shadow-xs"
                    : "bg-[var(--surface-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                動詞 (3)
              </button>
              <button
                onClick={() => setSelectedPartFilter("adj")}
                className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                  selectedPartFilter === "adj"
                    ? "bg-[var(--brand-primary)] text-white shadow-xs"
                    : "bg-[var(--surface-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                形容詞 (2)
              </button>
              <button
                onClick={() => setSelectedPartFilter("idiom")}
                className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                  selectedPartFilter === "idiom"
                    ? "bg-[var(--brand-primary)] text-white shadow-xs"
                    : "bg-[var(--surface-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                慣用句 (2)
              </button>
              <button
                onClick={() => setSelectedPartFilter("affix")}
                className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                  selectedPartFilter === "affix"
                    ? "bg-[var(--brand-primary)] text-white shadow-xs"
                    : "bg-[var(--surface-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                接辞 (1)
              </button>
            </div>
          </div>

          {/* Story Card List */}
          <div className="space-y-2.5 max-h-[720px] overflow-y-auto pr-1">
            {filteredStories.map((story) => {
              const isSelected = story.id === activeStory.id;
              return (
                <div
                  key={story.id}
                  onClick={() => handleSelectStory(story.id)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer flex flex-col gap-2 ${
                    isSelected
                      ? "bg-[var(--surface-primary)] border-[var(--brand-primary)] shadow-sm ring-2 ring-[var(--brand-primary)]/20"
                      : "bg-[var(--surface-primary)]/70 border-[var(--border-subtle)] hover:border-[var(--brand-primary)]/50 hover:bg-[var(--surface-primary)]"
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-mono font-bold text-[var(--brand-primary)] px-2.5 py-0.5 rounded-md bg-[var(--brand-primary)]/10">
                      {story.badge}
                    </span>
                    <span className="text-[var(--text-tertiary)] flex items-center gap-1 font-medium">
                      <Clock className="w-3 h-3" />
                      <span>{story.readTimeMinutes} menit</span>
                    </span>
                  </div>

                  <div className="font-bold text-sm sm:text-base text-[var(--text-primary)]">
                    <RubyTerm
                      rubyText={story.title}
                      fallbackText={story.title}
                      showFurigana={showFurigana}
                    />
                  </div>

                  <p className="text-xs text-[var(--text-secondary)] line-clamp-1">
                    {story.titleId}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-[var(--border-subtle)]/60 text-[11px]">
                    <span className="px-2 py-0.5 rounded bg-[var(--surface-secondary)] text-[var(--text-tertiary)]">
                      {story.partTitle}
                    </span>
                    <span className="font-bold text-[var(--brand-primary)] flex items-center gap-1">
                      <span>{isSelected ? "Sedang Dibuka" : "Buka Cerita"}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Active Story Reader (Isi Bacaan) */}
        <div
          className={`space-y-5 lg:col-span-8 ${
            mobileTab === "reader" ? "block" : "hidden lg:block"
          }`}
        >
          {activeStory && (
            <div className="rounded-3xl border border-[var(--border-subtle)] bg-[var(--surface-primary)] shadow-sm overflow-hidden flex flex-col">
              {/* Story Top Header Bar */}
              <div className="p-5 sm:p-6 border-b border-[var(--border-subtle)] bg-[var(--surface-secondary)]/30 space-y-4">
                {/* Top Row: Back on mobile + Quick Story Selector Dropdown + Prev/Next */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setMobileTab("list")}
                      className="inline-flex lg:hidden items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-primary)] hover:bg-[var(--surface-secondary)] text-xs font-bold text-[var(--text-primary)] transition-colors shadow-2xs"
                    >
                      <ChevronLeft className="w-4 h-4 text-[var(--brand-primary)]" />
                      <span>Daftar Cerita</span>
                    </button>

                    <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-lg bg-[var(--brand-primary)] text-white shadow-xs">
                      {activeStory.badge}
                    </span>

                    {/* Quick Story Selector Dropdown */}
                    <div className="relative">
                      <select
                        value={activeStory.id}
                        onChange={(e) => handleSelectStory(e.target.value)}
                        className="text-xs font-bold bg-[var(--surface-primary)] border border-[var(--border-subtle)] text-[var(--text-primary)] rounded-xl px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]"
                        title="Pilih cerita langsung"
                      >
                        {TANGO_N3_READINGS.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.badge}: {s.titleId}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Actions: Prev, Next, Audio, Translation */}
                  <div className="flex items-center gap-2">
                    <button
                      disabled={currentStoryIndex === 0}
                      onClick={handlePrevStory}
                      className="p-1.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-primary)] hover:bg-[var(--surface-secondary)] disabled:opacity-30 disabled:pointer-events-none text-[var(--text-secondary)]"
                      title="Cerita Sebelumnya"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>

                    <button
                      disabled={currentStoryIndex === TANGO_N3_READINGS.length - 1}
                      onClick={handleNextStory}
                      className="p-1.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-primary)] hover:bg-[var(--surface-secondary)] disabled:opacity-30 disabled:pointer-events-none text-[var(--text-secondary)]"
                      title="Cerita Selanjutnya"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => speak(activeStory.audioText, activeStory.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all ${
                        activeSpeechId === activeStory.id
                          ? "bg-[var(--brand-primary)] text-white border-[var(--brand-primary)] shadow-xs animate-pulse"
                          : "bg-[var(--surface-primary)] border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--brand-primary)] hover:border-[var(--brand-primary)]/50"
                      }`}
                      title="Dengarkan cerita lengkap dengan audio penutur asli Jepang"
                    >
                      <Volume2 className="w-4 h-4" />
                      <span>{activeSpeechId === activeStory.id ? "Memutar..." : "Putar Audio"}</span>
                    </button>

                    <button
                      onClick={() => setShowTranslation(!showTranslation)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-medium transition-all ${
                        showTranslation
                          ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
                          : "bg-[var(--surface-primary)] border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                      }`}
                    >
                      <Languages className="w-3.5 h-3.5" />
                      <span>{showTranslation ? "Tutup Arti" : "Lihat Arti"}</span>
                    </button>
                  </div>
                </div>

                {/* Story Title & Subtitle */}
                <div>
                  <div className="text-xs text-[var(--text-tertiary)] mb-1">
                    {activeStory.chapterTitle} · {activeStory.partTitle}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-[var(--text-primary)] tracking-tight">
                    <RubyTerm
                      rubyText={activeStory.title}
                      fallbackText={activeStory.title}
                      showFurigana={showFurigana}
                    />
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1 font-medium">
                    {activeStory.titleId}
                  </p>
                </div>

                {/* Target Words Highlight Pills */}
                <div className="pt-2 border-t border-[var(--border-subtle)]/60">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[11px] font-bold text-[var(--text-tertiary)] flex items-center gap-1 mr-1">
                      <Sparkles className="w-3 h-3 text-[var(--brand-primary)]" />
                      <span>Kosakata Target (Klik untuk info):</span>
                    </span>
                    {activeStory.targetWords.map((word) => {
                      const matched = TANGO_N3_CARDS.find((c) => c.word === word);
                      const isInspected = inspectedWord?.word === word;
                      return (
                        <button
                          key={word}
                          onClick={() => setInspectedWord(isInspected ? null : matched || null)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all flex items-center gap-1 ${
                            isInspected
                              ? "bg-[var(--brand-primary)] text-white border-[var(--brand-primary)] shadow-xs"
                              : "bg-[var(--surface-primary)] border-[var(--border-subtle)] hover:border-[var(--brand-primary)] text-[var(--text-primary)] shadow-2xs"
                          }`}
                        >
                          <span>{word}</span>
                          {matched && (
                            <span className={`text-[10px] ${isInspected ? "text-white/80" : "text-[var(--text-tertiary)]"}`}>
                              ({matched.reading})
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Story Content Reader Box */}
              <div className="p-6 sm:p-8 space-y-6">
                {/* Popover / Quick Inspector for clicked target word */}
                {inspectedWord && (
                  <div className="p-4 rounded-2xl bg-[var(--brand-primary)]/5 border border-[var(--brand-primary)]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-base text-[var(--text-primary)]">
                          {inspectedWord.word}
                        </span>
                        <span className="text-xs text-[var(--text-secondary)] font-mono">
                          【{inspectedWord.reading}】
                        </span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] font-bold">
                          {inspectedWord.partOfSpeech}
                        </span>
                      </div>
                      <p className="text-xs text-[var(--text-secondary)] font-medium">
                        {inspectedWord.meaningId}
                      </p>
                      {inspectedWord.collocation && (
                        <p className="text-[11px] text-[var(--text-tertiary)]">
                          連語 (Kolokasi):{" "}
                          <span className="font-medium text-[var(--text-primary)]">
                            {inspectedWord.collocation.meaningId}
                          </span>
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => speak(inspectedWord.word, inspectedWord.id)}
                        className="p-2 rounded-xl border border-[var(--border-subtle)] hover:bg-[var(--surface-secondary)] text-[var(--text-secondary)]"
                        title="Dengarkan lafal kata"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                      {onSelectCardDetail && (
                        <button
                          onClick={() => onSelectCardDetail(inspectedWord)}
                          className="text-xs px-2.5 py-1.5 rounded-xl bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] font-bold hover:bg-[var(--brand-primary)] hover:text-white transition-colors"
                        >
                          Latih Kata Ini →
                        </button>
                      )}
                      <button
                        onClick={() => setInspectedWord(null)}
                        className="text-xs px-2.5 py-1.5 rounded-xl border border-[var(--border-subtle)] hover:bg-[var(--surface-secondary)] text-[var(--text-secondary)]"
                      >
                        Tutup
                      </button>
                    </div>
                  </div>
                )}

                {/* Main Story Paragraph */}
                <div className="p-6 sm:p-8 rounded-2xl bg-[var(--surface-secondary)]/20 border border-[var(--border-subtle)]/70">
                  <div className="text-base sm:text-lg leading-[2.6] sm:leading-[2.8] text-[var(--text-primary)] tracking-wide font-medium select-text font-serif">
                    <RubyTerm
                      rubyText={activeStory.content}
                      fallbackText={activeStory.content}
                      showFurigana={showFurigana}
                      className="inline leading-[2.6] sm:leading-[2.8]"
                    />
                  </div>
                </div>

                {/* Indonesian Translation Section */}
                {showTranslation && (
                  <div className="p-5 sm:p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed space-y-2">
                    <div className="flex items-center gap-1.5 font-bold text-emerald-600 dark:text-emerald-400">
                      <Languages className="w-4 h-4" />
                      <span>Terjemahan Bahasa Indonesia:</span>
                    </div>
                    <p className="text-[var(--text-primary)]/90 leading-loose">
                      {activeStory.translation}
                    </p>
                  </div>
                )}

                {/* Comprehension Quiz (JLPT Dokkai) Section */}
                <div className="pt-4 border-t border-[var(--border-subtle)]">
                  {!showQuiz ? (
                    <button
                      onClick={() => setShowQuiz(true)}
                      className="w-full py-3.5 px-4 rounded-2xl border border-[var(--brand-primary)]/30 bg-[var(--brand-primary)]/5 hover:bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-xs"
                    >
                      <HelpCircle className="w-4 h-4" />
                      <span>Tes Pemahaman Dokkai (Latihan Soal Ujian N3 untuk Cerita Ini)</span>
                    </button>
                  ) : (
                    <div className="p-5 sm:p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-secondary)]/30 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs font-bold text-[var(--brand-primary)]">
                          <HelpCircle className="w-4 h-4" />
                          <span>Latihan Soal Pemahaman Membaca (読解問題)</span>
                        </div>
                        <button
                          onClick={handleResetQuiz}
                          className="text-[11px] text-[var(--text-tertiary)] hover:text-[var(--text-primary)] flex items-center gap-1"
                        >
                          <RotateCcw className="w-3 h-3" />
                          <span>Ulangi Soal</span>
                        </button>
                      </div>

                      {currentQuiz && (
                        <div className="space-y-4">
                          <div>
                            <p className="text-sm font-bold text-[var(--text-primary)] leading-relaxed">
                              {currentQuiz.question}
                            </p>
                            <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                              {currentQuiz.questionId}
                            </p>
                          </div>

                          {/* Options */}
                          <div className="space-y-2">
                            {currentQuiz.options.map((option, optIdx) => {
                              const isSelected = selectedAnswer === optIdx;
                              const isCorrectOpt = optIdx === currentQuiz.correctIndex;

                              let optStyle =
                                "border-[var(--border-subtle)] bg-[var(--surface-primary)] hover:border-[var(--brand-primary)]/50";
                              if (hasSubmittedAnswer) {
                                if (isCorrectOpt) {
                                  optStyle =
                                    "border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-bold ring-1 ring-emerald-500";
                                } else if (isSelected && !isCorrectOpt) {
                                  optStyle =
                                    "border-rose-500 bg-rose-500/10 text-rose-700 dark:text-rose-300 font-bold";
                                }
                              } else if (isSelected) {
                                optStyle =
                                  "border-[var(--brand-primary)] bg-[var(--brand-primary)]/10 ring-1 ring-[var(--brand-primary)]";
                              }

                              return (
                                <button
                                  key={optIdx}
                                  disabled={hasSubmittedAnswer}
                                  onClick={() => setSelectedAnswer(optIdx)}
                                  className={`w-full text-left p-3.5 rounded-xl border text-xs flex items-center gap-3 transition-all ${optStyle}`}
                                >
                                  <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center font-bold text-xs shrink-0">
                                    {optIdx + 1}
                                  </span>
                                  <span className="flex-1">{option}</span>
                                  {hasSubmittedAnswer && isCorrectOpt && (
                                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                                  )}
                                  {hasSubmittedAnswer && isSelected && !isCorrectOpt && (
                                    <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                                  )}
                                </button>
                              );
                            })}
                          </div>

                          {/* Check Button / Explanation */}
                          {!hasSubmittedAnswer ? (
                            <button
                              disabled={selectedAnswer === null}
                              onClick={handleCheckAnswer}
                              className="w-full py-2.5 rounded-xl bg-[var(--brand-primary)] hover:bg-[var(--brand-primary)]/90 disabled:opacity-40 disabled:pointer-events-none text-white text-xs font-bold transition-all shadow-xs"
                            >
                              Periksa Jawaban
                            </button>
                          ) : (
                            <div
                              className={`p-4 rounded-xl border text-xs space-y-1.5 ${
                                isAnswerCorrect
                                  ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-800 dark:text-emerald-200"
                                  : "bg-amber-500/10 border-amber-500/30 text-amber-800 dark:text-amber-200"
                              }`}
                            >
                              <div className="flex items-center gap-2 font-bold">
                                {isAnswerCorrect ? (
                                  <>
                                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                    <span>Tepat Sekali! (正解)</span>
                                  </>
                                ) : (
                                  <>
                                    <XCircle className="w-4 h-4 text-amber-500" />
                                    <span>Belum Tepat (不正解)</span>
                                  </>
                                )}
                              </div>
                              <p className="leading-relaxed text-[var(--text-secondary)]">
                                {currentQuiz.explanation}
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Story Bottom Navigation Bar */}
              <div className="p-4 border-t border-[var(--border-subtle)] bg-[var(--surface-secondary)]/30 flex items-center justify-between text-xs">
                <button
                  disabled={currentStoryIndex === 0}
                  onClick={handlePrevStory}
                  className="px-3.5 py-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-primary)] hover:bg-[var(--surface-secondary)] disabled:opacity-30 disabled:pointer-events-none text-[var(--text-primary)] font-semibold flex items-center gap-1.5 transition-all shadow-2xs"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Sebelumnya</span>
                </button>

                <button
                  onClick={() => setMobileTab("list")}
                  className="lg:hidden text-xs font-bold text-[var(--brand-primary)] hover:underline"
                >
                  Lihat 20 Cerita
                </button>

                <span className="hidden lg:inline-block font-mono text-xs text-[var(--text-tertiary)]">
                  {activeStory.badge} / 20 Cerita Latihan Membaca
                </span>

                <button
                  disabled={currentStoryIndex === TANGO_N3_READINGS.length - 1}
                  onClick={handleNextStory}
                  className="px-3.5 py-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-primary)] hover:bg-[var(--surface-secondary)] disabled:opacity-30 disabled:pointer-events-none text-[var(--text-primary)] font-semibold flex items-center gap-1.5 transition-all shadow-2xs"
                >
                  <span>Selanjutnya</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
