# Whole Study Polish Implementation Plan

**Goal:** Apply the approved clean study design to the whole learning experience, including real two-sided focus flashcards.
**Architecture:** Route-aware shared study shell surrounds the existing tools; scoped module styles refine their existing controls. Focus flashcards get an isolated accessible flip component. Keep original learning state and storage adapters.
**Stack:** Existing Next 16, React 19, TypeScript, Tailwind and Lucide. No packages or deployment.

- [x] Add tested route metadata in `src/lib/study-routes.ts`. Map recognized study tools and return null for portfolio/unrelated routes; tolerate trailing slashes.
- [x] Extend `study-shell.tsx` with current route, breadcrumb and module navigation links; preserve overview behavior. Create `study-tools-layout.tsx` and `src/app/tools/layout.tsx`, including existing user profile behavior. Remove duplicate outer main wrappers from N3 tool pages while leaving one main landmark.
- [x] Add scoped `study-modules.css`: bridge the existing CSS variables to study tokens, style explicit N3 panel classes and reading controls, preserve quiz result colors and modal overlays. Inspect all six module pages and original flashcards in the browser.
- [x] Create `focus-flashcard.tsx` with tap, keyboard, named flip control, semantic content and reduced motion. Replace the existing single-face focus flashcard JSX; retain safe recording and card reset. Verify keyboard and click in preview.
- [x] Run storage/route tests, typecheck and production build. Inspect mobile and desktop, run code review, update the local production preview and save screenshots/patch in chat outputs.
