// JLPT N3 Tango - Complete 1,800 Vocabulary Dataset
// Divided into 5 Parts & 46 Chapters with high-yield collocations & contextual reading stories

export * from "./tango-n3/types";
export * from "./tango-n3/chapters";
export * from "./tango-n3/readings";
export * from "./tango-n3/part1-nouns";
export * from "./tango-n3/part2-verbs";
export * from "./tango-n3/part3-adjectives";
export * from "./tango-n3/part4-idioms";
export * from "./tango-n3/part5-affixes";

import { TangoN3Card } from "./tango-n3/types";
import { PART1_NOUNS } from "./tango-n3/part1-nouns";
import { PART2_VERBS } from "./tango-n3/part2-verbs";
import { PART3_ADJECTIVES } from "./tango-n3/part3-adjectives";
import { PART4_IDIOMS } from "./tango-n3/part4-idioms";
import { PART5_AFFIXES } from "./tango-n3/part5-affixes";

// Complete 1,800 Cards
export const TANGO_N3_CARDS: TangoN3Card[] = [
  ...PART1_NOUNS,
  ...PART2_VERBS,
  ...PART3_ADJECTIVES,
  ...PART4_IDIOMS,
  ...PART5_AFFIXES,
];
