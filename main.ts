// Everyday Wonder, Two Days to Find the Line
// One sentence, at most 200 characters, on a small moment of wonder
// in everyday life. Writes the sentence to /output/entry.txt.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry: a dandelion seed lands on the keyboard mid-typing, and the
// typist treats it like punctuation the wind sent. One sentence, grounded
// in something real, with the surprise in the phrasing itself.
const SENTENCE =
  "A dandelion seed drifted through my open window and landed on the keyboard, and I typed around it like it was a comma the wind had sent.";

function validate(text: string): void {
  const chars = [...text].length;
  if (chars < 1 || chars > 200) {
    throw new Error(`entry must be 1-200 characters, got ${chars}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only white space");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  // One sentence: exactly one terminal period, at the end, and no other
  // sentence-ending punctuation anywhere in the text.
  const terminators = text.match(/[.!?]/g) ?? [];
  if (terminators.length !== 1 || !text.endsWith(".")) {
    throw new Error("entry must be exactly one sentence");
  }
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
validate(SENTENCE);
writeFileSync(join(outDir, "entry.txt"), SENTENCE, "utf8");
console.log(`wrote ${[...SENTENCE].length} characters to ${join(outDir, "entry.txt")}`);
