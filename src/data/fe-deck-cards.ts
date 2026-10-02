import { FE_CARDS, FECard } from "./fe-study-data";
import { FE_DAILY_DECKS } from "./fe-daily-decks";

// Helper terpisah agar FE_DAILY_DECKS (metadata) tidak menyeret FE_CARDS
// ke dalam graph halaman yang hanya butuh daftar deck.
export function getCardsForDay(day: number): FECard[] {
  const deck = FE_DAILY_DECKS.find((d) => d.day === day);
  if (!deck) return [];
  const cardMap = new Map(FE_CARDS.map((c) => [c.id, c]));
  return deck.cardIds.map((id) => cardMap.get(id)).filter((c): c is FECard => Boolean(c));
}
