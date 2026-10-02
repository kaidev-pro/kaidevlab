// Statistik ringan untuk portal /learn — TANPA mengimpor konten kartu penuh.
import { TANGO_N3_CHAPTERS } from "./tango-n3/chapters";

export const FE_TOTAL_CARDS = 199; // sinkron dengan src/data/fe-study-data.ts

export const TANGO_TOTAL_CARDS = TANGO_N3_CHAPTERS.reduce(
  (sum, ch) => sum + (ch.endNum - ch.startNum + 1),
  0
);

// ID kartu tango berpola "tango-0001".."tango-1800" mengikuti bookNumber,
// penomoran BERLANJUT lintas part (part2 mulai tango-0646).
export function tangoCardIdByNumber(bookNumber: number): string {
  return `tango-${String(bookNumber).padStart(4, "0")}`;
}
