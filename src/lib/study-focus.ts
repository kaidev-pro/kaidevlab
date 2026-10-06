export type FocusTrack = "tango" | "bunpou" | "dokkai" | "fe";
export type FocusRating = "forgot" | "unsure" | "mastered";
export const FOCUS_LIMITS: Record<FocusTrack, number> = { tango: 10, bunpou: 1, dokkai: 1, fe: 5 };
export const FOCUS_STORAGE_KEY = "kaidevlab_focus_session_v1";
export interface FocusItem { id: string; group?: string }
export interface FocusSnapshot { mastered: string[]; review: string[]; nextReview?: Record<string, string>; unlocked?: string[] }
export interface FocusSession {
  version: 1; track: FocusTrack; itemIds: string[]; cursor: number;
  results: { id: string; rating: FocusRating }[]; startedAt: number; completed: boolean;
  answers?: Record<string, FocusQuestionAnswer>;
}
export interface FocusQuestionAnswer { choice?: string; order?: number[]; correct: boolean }
type SessionStorage = Pick<Storage, "getItem" | "setItem">;
export function isFocusTrack(value: unknown): value is FocusTrack {
  return typeof value === "string" && Object.hasOwn(FOCUS_LIMITS, value);
}
export function selectFocusItems(catalog: FocusItem[], snapshot: FocusSnapshot, today: string, limit: number): string[] {
  const mastered = new Set(snapshot.mastered), review = new Set(snapshot.review);
  const unlocked = snapshot.unlocked ? new Set(snapshot.unlocked) : null;
  const due: string[] = [], fresh: string[] = [], seen = new Set<string>();
  for (const item of catalog) {
    if (seen.has(item.id) || (unlocked && item.group && !unlocked.has(item.group))) continue;
    seen.add(item.id);
    const next = snapshot.nextReview?.[item.id];
    if ((next && next <= today) || (review.has(item.id) && (!next || next <= today))) due.push(item.id);
    else if (!mastered.has(item.id) && !next) fresh.push(item.id);
  }
  return [...due, ...fresh].slice(0, Math.max(0, limit));
}
export function createFocusSession(track: FocusTrack, itemIds: string[], startedAt = Date.now()): FocusSession {
  const ids = [...new Set(itemIds)].slice(0, FOCUS_LIMITS[track]);
  return { version: 1, track, itemIds: ids, cursor: 0, results: [], startedAt, completed: ids.length === 0 };
}
export function commitFocusAnswer(session: FocusSession, id: string, rating: FocusRating): FocusSession {
  if (session.completed || session.itemIds[session.cursor] !== id) return session;
  const cursor = session.cursor + 1;
  return { ...session, cursor, results: [...session.results, { id, rating }], completed: cursor === session.itemIds.length };
}
export function commitFocusQuestion(session: FocusSession, questionId: string, answer: FocusQuestionAnswer): FocusSession {
  if (session.completed || session.answers?.[questionId]) return session;
  return {...session, answers: {...session.answers, [questionId]: answer}};
}
export function getExerciseReviewIds(catalog: {id:string;questions:{id:string}[]}[], answers: Record<string,{isCorrect:boolean}>, bookmarked: string[]): string[] {
  return [...new Set([...bookmarked,...catalog.filter(item=>item.questions.some(question=>answers[question.id]?.isCorrect===false)).map(item=>item.id)])];
}
export function isSessionAvailable(session: FocusSession, catalog: FocusItem[], unlocked?: string[]): boolean {
  const available = new Set(catalog.map(item => item.id));
  const allowed = new Set(catalog.filter(item=>!unlocked||!item.group||unlocked.includes(item.group)).map(item=>item.id));
  return session.itemIds.every(id => available.has(id)) && session.itemIds.slice(session.cursor).every(id=>allowed.has(id));
}
function browserStorage(): SessionStorage | null {
  try { return typeof window !== "undefined" ? window.localStorage : null; } catch { return null; }
}
export function saveFocusSession(session: FocusSession, storage: SessionStorage | null = browserStorage()): boolean {
  try { if (!storage) return false; storage.setItem(FOCUS_STORAGE_KEY, JSON.stringify(session)); return true; } catch { return false; }
}
export function loadFocusSession(storage: Pick<Storage, "getItem"> | null = browserStorage()): FocusSession | null {
  try {
    const raw = storage?.getItem(FOCUS_STORAGE_KEY); if (!raw) return null;
    const value = JSON.parse(raw);
    if (value.version !== 1 || !isFocusTrack(value.track) || !Array.isArray(value.itemIds) || !value.itemIds.length || value.itemIds.length > FOCUS_LIMITS[value.track as FocusTrack]) return null;
    if (!value.itemIds.every((id: unknown) => typeof id === "string" && id.length > 0 && id.length < 120) || new Set(value.itemIds).size !== value.itemIds.length) return null;
    if (!Number.isInteger(value.cursor) || value.cursor < 0 || value.cursor > value.itemIds.length || !Number.isFinite(value.startedAt) || value.startedAt <= 0) return null;
    if (value.completed !== (value.cursor === value.itemIds.length) || !Array.isArray(value.results) || value.results.length !== value.cursor) return null;
    if (!value.results.every((result: { id?: unknown; rating?: unknown }, index: number) => result?.id === value.itemIds[index] && ["forgot", "unsure", "mastered"].includes(String(result.rating)))) return null;
    if (value.answers && (typeof value.answers !== "object" || Array.isArray(value.answers) || Object.keys(value.answers).length > 40 || !Object.values(value.answers).every(answer => {
      const a = answer as FocusQuestionAnswer;
      return a && typeof a.correct === "boolean" && (a.choice === undefined || ["1","2","3","4"].includes(a.choice)) && (a.order === undefined || (Array.isArray(a.order) && a.order.length === 4 && new Set(a.order).size === 4 && a.order.every(i=>Number.isInteger(i)&&i>=0&&i<4)));
    }))) return null;
    return value as FocusSession;
  } catch { return null; }
}
