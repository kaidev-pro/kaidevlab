"use client";
import { TANGO_N3_CARDS, TANGO_N3_CHAPTERS } from "@/data/tango-n3-data";
import { FE_CARDS } from "@/data/fe-study-data";
import { FE_DAILY_DECKS } from "@/data/fe-daily-decks";
import { BUNPOU_ITEMS } from "@/data/bunpou-n3/grammar-items";
import { DOKKAI_PASSAGES } from "@/data/dokkai-n3/passages";
import { loadTangoProgress, recordTangoReview } from "@/lib/tango-n3-storage";
import { loadStudyProgress, recordCardReview } from "@/lib/fe-study-storage";
import { loadBunpouProgress, recordBunpouAnswer } from "@/components/bunpou-n3/bunpou-storage";
import { loadDokkaiProgress, recordDokkaiAnswer } from "@/components/dokkai-n3/dokkai-storage";
import { recordUnifiedActivity, getTodayDateStr } from "@/lib/unified-study-storage";
import { FocusItem, FocusTrack, FocusRating, FocusQuestionAnswer, FOCUS_LIMITS, createFocusSession, selectFocusItems, getExerciseReviewIds } from "./study-focus";

export function getFocusCatalog(track: FocusTrack): FocusItem[] {
  if (track === "tango") return TANGO_N3_CARDS.map(card => ({id:card.id,group:card.chapterId}));
  if (track === "fe") return FE_CARDS.map(card => ({id:card.id,group:String(FE_DAILY_DECKS.find(deck => deck.cardIds.includes(card.id))?.day || 1)}));
  return (track === "bunpou" ? BUNPOU_ITEMS : DOKKAI_PASSAGES).map(item => ({id:item.id}));
}
export function getFocusUnlockedGroups(track: FocusTrack): string[] | undefined {
  if(track==="tango") { const progress=loadTangoProgress(); return progress.masteryModeEnabled ? [...progress.unlockedChapterIds,TANGO_N3_CHAPTERS[0].id] : undefined; }
  if(track==="fe") { const progress=loadStudyProgress(); return progress.masteryModeEnabled ? (progress.unlockedDeckDays||[1]).map(String) : undefined; }
  return undefined;
}
export function planFocusSession(track: FocusTrack) {
  const tango=loadTangoProgress(), fe=loadStudyProgress(), bunpou=loadBunpouProgress(), dokkai=loadDokkaiProgress();
  const snapshot = track === "tango" ? {mastered:tango.masteredCardIds,review:[...tango.reviewCardIds,...tango.starredCardIds],nextReview:tango.cardNextReview,unlocked:getFocusUnlockedGroups(track)}
    : track === "fe" ? {mastered:fe.masteredCardIds,review:[...fe.reviewCardIds,...fe.starredCardIds],unlocked:getFocusUnlockedGroups(track)}
    : track === "bunpou" ? {mastered:bunpou.studiedPatternIds,review:getExerciseReviewIds(BUNPOU_ITEMS,bunpou.answeredQuestions,bunpou.bookmarkedPatternIds)}
    : {mastered:dokkai.completedPassageIds,review:getExerciseReviewIds(DOKKAI_PASSAGES,dokkai.answeredQuestions,dokkai.bookmarkedPassageIds)};
  return createFocusSession(track, selectFocusItems(getFocusCatalog(track),snapshot,getTodayDateStr(),FOCUS_LIMITS[track]));
}
export function recordFocusCard(track: "tango" | "fe", id: string, rating: FocusRating) {
  if (track === "tango") {
    const card = TANGO_N3_CARDS.find(item=>item.id===id); if(!card) return false;
    const expected=recordTangoReview(id,card.chapterId,rating);
    if(JSON.stringify(loadTangoProgress())!==JSON.stringify(expected))return false;
  } else {
    const card = FE_CARDS.find(item=>item.id===id); if(!card) return false;
    const expected=recordCardReview(id,card.category,rating);
    if(JSON.stringify(loadStudyProgress())!==JSON.stringify(expected))return false;
  }
  recordUnifiedActivity(track,1);
  return true;
}
export function recordFocusQuestion(track:"bunpou"|"dokkai", itemId:string, questionId:string, answer:FocusQuestionAnswer, complete:boolean): boolean {
  if(track==="bunpou") {
    const question=BUNPOU_ITEMS.find(item=>item.id===itemId)?.questions.find(item=>item.id===questionId);if(!question)return false;
    const expected=recordBunpouAnswer(itemId,questionId,answer.correct,{selectedKey:answer.choice,orderedItems:answer.order?.map(index=>question.items?.[index]||"")});
    if(JSON.stringify(loadBunpouProgress())!==JSON.stringify(expected))return false;
  } else {
    if(!DOKKAI_PASSAGES.find(item=>item.id===itemId)?.questions.some(item=>item.id===questionId))return false;
    const expected=recordDokkaiAnswer(itemId,questionId,answer.choice||"1",answer.correct,complete);
    if(JSON.stringify(loadDokkaiProgress())!==JSON.stringify(expected))return false;
  }
  recordUnifiedActivity(track,1);return true;
}
