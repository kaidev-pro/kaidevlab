# Study Focus Implementation Plan

**Goal:** implement approved Clean Study homepage and real bounded learning sessions.
**Architecture:** pure session engine with validated persistence; existing content/storage adapters; isolated study dashboard and focus route. Original tool components are preserved.
**Stack:** existing Next 16, React 19, TypeScript, Lucide; no new packages.

- [x] Session engine: tests first for due ordering, unlock filtering, unique bounded tasks, resume validation, answer idempotency, denied storage and preserving unrelated keys.
- [x] Build content/storage adapters using existing recordTangoReview, recordCardReview, recordBunpouAnswer and recordDokkaiAnswer.
- [x] Implement study shell/dashboard with approved asset, existing search/sync/profile/language/theme and actual statistics.
- [x] Implement focused flashcard, grammar and reading exercise views and session summary. Persist each answer and restore the next task on reload.
- [x] Run tests/typecheck/build. Inspect desktop/mobile and use a separate browser origin for test progress. Export screenshots and Git patch to chat outputs.

Validation: 15 session and real-storage tests passed; production static export includes /learn/focus. Browser checks covered all four session tracks, reload/resume, incorrect answer feedback, desktop/tablet/320px/390px, theme, language, search and sync. Independent code review completed; reported persistence and review-priority issues were fixed. No live deployment.
