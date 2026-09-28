"use client";

import React, { useState, useMemo } from "react";
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
  BookmarkCheck,
  RotateCcw,
  Layers,
  Clock,
  ExternalLink,
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
  const [selectedStoryIndex, setSelectedStoryIndex] = useState(0);
  const [selectedPartFilter, setSelectedPartFilter] = useState<string>("all");
  const [showFurigana, setShowFurigana] = useState(true);
  const [showTranslation, setShowTranslation] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [hasSubmittedAnswer, setHasSubmittedAnswer] = useState(false);
  const [inspectedWord, setInspectedWord] = useState<TangoN3Card | null>(null);

  // Filter stories
  const filteredStories = useMemo(() => {
    if (selectedPartFilter === "all") return TANGO_N3_READINGS;
    return TANGO_N3_READINGS.filter((r) => r.partId === selectedPartFilter);
  }, [selectedPartFilter]);

  const activeStory = filteredStories[selectedStoryIndex] || filteredStories[0] || TANGO_N3_READINGS[0];

  // Reset quiz state when changing story
  function handleSelectStory(index: number) {
    setSelectedStoryIndex(index);
    setSelectedAnswer(null);
    setHasSubmittedAnswer(false);
    setShowTranslation(false);
    setShowQuiz(false);
    setInspectedWord(null);
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

  // Lookup target words in the 1800 cards database
  const targetCards = useMemo(() => {
    if (!activeStory) return [];
    return activeStory.targetWords
      .map((w) => TANGO_N3_CARDS.find((c) => c.word === w))
      .filter((c): c is TangoN3Card => c !== undefined);
  }, [activeStory]);

  const currentQuiz = activeStory.comprehensionQuestions?.[0];
  const isAnswerCorrect = hasSubmittedAnswer && selectedAnswer === currentQuiz?.correctIndex;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-5 sm:p-6 rounded-3xl border border-[var(--border-subtle)] bg-gradient-to-br from-[var(--surface-primary)] to-[var(--surface-secondary)]/50 shadow-sm relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] text-xs font-bold">
              <BookOpen className="w-3.5 h-3.5" />
              <span>「読んでみよう」20 Bacaan Resmi Shin Kanzen Master Tango N3</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-[var(--text-primary)] tracking-tight">
              Latihan Membaca Wacana Kontekstual
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-2xl leading-relaxed">
              Kuasai 1.800 kosakata N3 dalam konteks artikel nyata. Dilengkapi audio penutur asli, toggle furigana, terjemahan, dan latihan pemahaman soal JLPT Dokkai.
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

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-4 mt-4 border-t border-[var(--border-subtle)]/70 text-xs">
          <button
            onClick={() => {
              setSelectedPartFilter("all");
              setSelectedStoryIndex(0);
            }}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              selectedPartFilter === "all"
                ? "bg-[var(--brand-primary)] text-white shadow-xs"
                : "bg-[var(--surface-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            Semua (20 Cerita)
          </button>
          <button
            onClick={() => {
              setSelectedPartFilter("noun");
              setSelectedStoryIndex(0);
            }}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              selectedPartFilter === "noun"
                ? "bg-[var(--brand-primary)] text-white shadow-xs"
                : "bg-[var(--surface-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            名詞 (12 Cerita)
          </button>
          <button
            onClick={() => {
              setSelectedPartFilter("verb");
              setSelectedStoryIndex(0);
            }}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              selectedPartFilter === "verb"
                ? "bg-[var(--brand-primary)] text-white shadow-xs"
                : "bg-[var(--surface-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            動詞 (3 Cerita)
          </button>
          <button
            onClick={() => {
              setSelectedPartFilter("adj");
              setSelectedStoryIndex(0);
            }}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              selectedPartFilter === "adj"
                ? "bg-[var(--brand-primary)] text-white shadow-xs"
                : "bg-[var(--surface-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            形容詞・副詞 (2 Cerita)
          </button>
          <button
            onClick={() => {
              setSelectedPartFilter("idiom");
              setSelectedStoryIndex(0);
            }}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              selectedPartFilter === "idiom"
                ? "bg-[var(--brand-primary)] text-white shadow-xs"
                : "bg-[var(--surface-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            慣用句・カタカナ (2 Cerita)
          </button>
          <button
            onClick={() => {
              setSelectedPartFilter("affix");
              setSelectedStoryIndex(0);
            }}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              selectedPartFilter === "affix"
                ? "bg-[var(--brand-primary)] text-white shadow-xs"
                : "bg-[var(--surface-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            接辞・接続詞 (1 Cerita)
          </button>
        </div>
      </div>

      {/* Main Split Layout: Left Story Carousel/Picker + Right Active Reader */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Story Picker Drawer */}
        <div className="lg:col-span-4 space-y-3">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold text-[var(--text-secondary)] flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[var(--brand-primary)]" />
              <span>Daftar Artikel ({filteredStories.length})</span>
            </span>
            <span className="text-[11px] text-[var(--text-tertiary)]">
              {selectedStoryIndex + 1} dari {filteredStories.length}
            </span>
          </div>

          <div className="space-y-2 max-h-[640px] overflow-y-auto pr-1">
            {filteredStories.map((story, idx) => {
              const isSelected = idx === selectedStoryIndex;
              return (
                <button
                  key={story.id}
                  onClick={() => handleSelectStory(idx)}
                  className={`w-full text-left p-3.5 rounded-2xl border transition-all flex flex-col gap-1.5 ${
                    isSelected
                      ? "bg-[var(--surface-primary)] border-[var(--brand-primary)] shadow-sm ring-2 ring-[var(--brand-primary)]/15"
                      : "bg-[var(--surface-primary)]/60 border-[var(--border-subtle)] hover:border-[var(--brand-primary)]/50 hover:bg-[var(--surface-primary)]"
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-mono font-bold text-[var(--brand-primary)] px-2 py-0.5 rounded-md bg-[var(--brand-primary)]/10">
                      {story.badge}
                    </span>
                    <span className="text-[var(--text-tertiary)] flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{story.readTimeMinutes} min</span>
                    </span>
                  </div>

                  <div className="font-bold text-sm text-[var(--text-primary)] line-clamp-1">
                    <RubyTerm
                      rubyText={story.title}
                      fallbackText={story.title}
                      showFurigana={showFurigana}
                    />
                  </div>

                  <p className="text-xs text-[var(--text-secondary)] line-clamp-1">
                    {story.titleId}
                  </p>

                  <div className="flex items-center gap-1.5 pt-1 text-[10px] text-[var(--text-tertiary)]">
                    <span className="px-1.5 py-0.5 rounded bg-[var(--surface-secondary)]">
                      {story.partTitle}
                    </span>
                    <span>• {story.targetWords.length} kata N3</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Active Reader Pane */}
        <div className="lg:col-span-8 space-y-5">
          {activeStory && (
            <div className="rounded-3xl border border-[var(--border-subtle)] bg-[var(--surface-primary)] shadow-sm overflow-hidden flex flex-col">
              {/* Story Top Header Bar */}
              <div className="p-5 sm:p-6 border-b border-[var(--border-subtle)] bg-[var(--surface-secondary)]/30 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-lg bg-[var(--brand-primary)] text-white shadow-xs">
                      {activeStory.badge}
                    </span>
                    <span className="text-xs text-[var(--text-secondary)]">
                      {activeStory.chapterTitle}
                    </span>
                  </div>

                  {/* Top Bar Actions */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => speak(activeStory.audioText, activeStory.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all ${
                        activeSpeechId === activeStory.id
                          ? "bg-[var(--brand-primary)] text-white border-[var(--brand-primary)] shadow-xs animate-pulse"
                          : "bg-[var(--surface-primary)] border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--brand-primary)] hover:border-[var(--brand-primary)]/50"
                      }`}
                      title="Dengarkan cerita lengkap dengan suara penutur asli Jepang"
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

                <div>
                  <h3 className="text-lg sm:text-xl font-black text-[var(--text-primary)] tracking-tight">
                    <RubyTerm
                      rubyText={activeStory.title}
                      fallbackText={activeStory.title}
                      showFurigana={showFurigana}
                    />
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-0.5">
                    {activeStory.titleId}
                  </p>
                </div>

                {/* Target Words Highlight Pills */}
                <div className="pt-2 border-t border-[var(--border-subtle)]/60">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[11px] font-bold text-[var(--text-tertiary)] flex items-center gap-1 mr-1">
                      <Sparkles className="w-3 h-3 text-[var(--brand-primary)]" />
                      <span>Target Kosakata:</span>
                    </span>
                    {activeStory.targetWords.map((word) => {
                      const matched = TANGO_N3_CARDS.find((c) => c.word === word);
                      return (
                        <button
                          key={word}
                          onClick={() => setInspectedWord(matched || null)}
                          className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-[var(--surface-primary)] border border-[var(--border-subtle)] hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)] text-[var(--text-primary)] shadow-2xs transition-all flex items-center gap-1"
                        >
                          <span>{word}</span>
                          {matched && (
                            <span className="text-[10px] text-[var(--text-tertiary)]">
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
                          連語: <span className="font-medium text-[var(--text-primary)]">{inspectedWord.collocation.meaningId}</span>
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
                <div className="p-6 sm:p-7 rounded-2xl bg-[var(--surface-secondary)]/20 border border-[var(--border-subtle)]/70">
                  <div className="text-base sm:text-lg leading-[2.6] sm:leading-[2.8] text-[var(--text-primary)] tracking-wide font-medium select-text font-serif">
                    <RubyTerm
                      rubyText={activeStory.content}
                      fallbackText={activeStory.content}
                      showFurigana={showFurigana}
                    />
                  </div>
                </div>

                {/* Indonesian Translation Section */}
                {showTranslation && (
                  <div className="p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed space-y-1.5">
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
                      className="w-full py-3 px-4 rounded-2xl border border-[var(--brand-primary)]/30 bg-[var(--brand-primary)]/5 hover:bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-xs"
                    >
                      <HelpCircle className="w-4 h-4" />
                      <span>Tes Pemahaman Dokkai (Latihan Soal Ujian N3)</span>
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

                              let optStyle = "border-[var(--border-subtle)] bg-[var(--surface-primary)] hover:border-[var(--brand-primary)]/50";
                              if (hasSubmittedAnswer) {
                                if (isCorrectOpt) {
                                  optStyle = "border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-bold ring-1 ring-emerald-500";
                                } else if (isSelected && !isCorrectOpt) {
                                  optStyle = "border-rose-500 bg-rose-500/10 text-rose-700 dark:text-rose-300 font-bold";
                                }
                              } else if (isSelected) {
                                optStyle = "border-[var(--brand-primary)] bg-[var(--brand-primary)]/10 ring-1 ring-[var(--brand-primary)]";
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
                            <div className={`p-4 rounded-xl border text-xs space-y-1.5 ${
                              isAnswerCorrect
                                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-800 dark:text-emerald-200"
                                : "bg-amber-500/10 border-amber-500/30 text-amber-800 dark:text-amber-200"
                            }`}>
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

              {/* Story Bottom Navigation Controls */}
              <div className="p-4 border-t border-[var(--border-subtle)] bg-[var(--surface-secondary)]/30 flex items-center justify-between text-xs">
                <button
                  disabled={selectedStoryIndex === 0}
                  onClick={() => handleSelectStory(selectedStoryIndex - 1)}
                  className="px-3.5 py-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-primary)] hover:bg-[var(--surface-secondary)] disabled:opacity-30 disabled:pointer-events-none text-[var(--text-primary)] font-semibold flex items-center gap-1.5 transition-all shadow-2xs"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Sebelumnya</span>
                </button>

                <span className="font-mono text-xs text-[var(--text-tertiary)]">
                  {activeStory.badge} / {filteredStories.length} Cerita
                </span>

                <button
                  disabled={selectedStoryIndex === filteredStories.length - 1}
                  onClick={() => handleSelectStory(selectedStoryIndex + 1)}
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
