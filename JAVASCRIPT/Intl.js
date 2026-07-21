/**
 ** THE JAVASCRIPT INTL (INTERNATIONALIZATION) CHEATSHEET
 *
 * This file serves as a comprehensive guide to JavaScript's built-in Intl API.
 * Knowing this API is highly valued in professional environments because it
 * eliminates the need for heavy external formatting libraries.
 */

// =========================================================================
// 1. Intl.DateTimeFormat (DATES & TIMES)
// =========================================================================
// This object formats dates and times beautifully depending on the locale.

function learnDateTimeFormatting() {
  const now = new Date(2026, 6, 14, 14, 53, 0); // July 14, 2026, 2:53 PM

  console.log("--- 1. Intl.DateTimeFormat Examples ---");

  // A. Default Locales
  const USFormatter = new Intl.DateTimeFormat("en-US");
  const UKFormatter = new Intl.DateTimeFormat("en-GB");

  console.log("US Date:", USFormatter.format(now)); // "7/14/2026"
  console.log("UK Date:", UKFormatter.format(now)); // "14/07/2026"

  // B. Customizing Output with Options
  // Options allow you to control exactly how year, month, day, and time appear.
  const complexOptions = {
    weekday: "long", // "Tuesday"
    year: "numeric", // "2026"
    month: "long", // "July"
    day: "numeric", // "14"
    hour: "numeric", // "2"
    minute: "2-digit", // "53"
    hour12: true, // AM/PM format
  };

  const fullFormatter = new Intl.DateTimeFormat("en-US", complexOptions);
  console.log("Detailed US:", fullFormatter.format(now));
  // Output: "Tuesday, July 14, 2026 at 2:53 PM"

  // C. Quick Tip: Destructuring Parts
  // Sometimes you need the raw parts to build custom layouts in UI components.
  const parts = fullFormatter.formatToParts(now);
  console.log("Parsed Parts:", parts.slice(0, 3));
  // Returns an array of objects: [{ type: 'weekday', value: 'Tuesday' }, ...]
}

// =========================================================================
// 2. Intl.NumberFormat (CURRENCY, PERCENTAGES, & MEASUREMENTS)
// =========================================================================
// Never manually format currency again! Intl.NumberFormat handles currency
// symbols, decimal points, and thousand separators perfectly out of the box.

function learnNumberFormatting() {
  const salary = 125000.75;
  const growthRate = 0.0825; // 8.25%
  const distance = 42.195; // kilometers

  console.log("\n--- 2. Intl.NumberFormat Examples ---");

  // A. Currency Formatting (Crucial for e-commerce sites!)
  const usdFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const eurFormatter = new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  });

  console.log("US Dollars: ", usdFormatter.format(salary)); // "$125,000.75"
  console.log("German Euros:", eurFormatter.format(salary)); // "125.000,75 €"

  // B. Percentages
  const percentFormatter = new Intl.NumberFormat("en-US", {
    style: "percent",
    minimumFractionDigits: 2, // Forces exactly two decimal places
  });
  console.log("Growth Rate:", percentFormatter.format(growthRate)); // "8.25%"

  // C. Unit Formatting (Great for physical or scientific apps)
  const unitFormatter = new Intl.NumberFormat("en-US", {
    style: "unit",
    unit: "kilometer",
    unitDisplay: "long", // Can be "short", "narrow", or "long"
  });
  console.log("Marathon Distance:", unitFormatter.format(distance)); // "42.195 kilometers"
}

// =========================================================================
// 3. Intl.RelativeTimeFormat (SOCIAL MEDIA TIMESTAMPS)
// =========================================================================
// Used to display "2 hours ago", "yesterday", or "in 3 days" relative to now.

function learnRelativeTime() {
  console.log("\n--- 3. Intl.RelativeTimeFormat Examples ---");

  const relativeFormatter = new Intl.RelativeTimeFormat("en", {
    numeric: "auto", // Uses words like "yesterday" instead of "1 day ago" if possible
    style: "long", // Can be "long", "short", or "narrow"
  });

  console.log(relativeFormatter.format(-1, "day")); // "yesterday"
  console.log(relativeFormatter.format(-3, "hour")); // "3 hours ago"
  console.log(relativeFormatter.format(12, "second")); // "in 12 seconds"
}

// =========================================================================
// 4. Intl.ListFormat (HUMAN-READABLE LISTS)
// =========================================================================
// Automatically adds the correct oxford commas and conjunctions ("and" / "or")
// depending on the target language.

function learnListFormatting() {
  console.log("\n--- 4. Intl.ListFormat Examples ---");

  const fruits = ["Apples", "Oranges", "Bananas"];

  // Standard "and" list
  const andFormatter = new Intl.ListFormat("en", {
    style: "long",
    type: "conjunction",
  });
  console.log("Conjunction:", andFormatter.format(fruits)); // "Apples, Oranges, and Bananas"

  // Disjunction list ("or")
  const orFormatter = new Intl.ListFormat("en", {
    style: "short",
    type: "disjunction",
  });
  console.log("Disjunction:", orFormatter.format(fruits)); // "Apples, Oranges, or Bananas"
}

// =========================================================================
// 5. Intl.Segmenter (LOCALE-AWARE TEXT SEGMENTATION)
// =========================================================================
// Standard string splitting breaks with emojis or non-English characters.
// Segmenter lets you split strings cleanly into words, sentences, or characters.

function learnTextSegmentation() {
  const text = "Hello! This is a real-world JS test.";
  const segmenter = new Intl.Segmenter("en", { granularity: "word" });
  const segments = segmenter.segment(text);

  // Safely extract words from the iterator
  const words = Array.from(segments)
    .filter((segment) => segment.isWordLike)
    .map((segment) => segment.segment);

  console.log("Extracted Words:", words);
  // Output: ["Hello", "This", "is", "a", "real", "world", "JS", "test"]
}

// =========================================================================
// EXECUTION BLOCK
// =========================================================================
// Run all functions to see the output in action

learnDateTimeFormatting();
learnNumberFormatting();
learnRelativeTime();
learnListFormatting();
learnTextSegmentation();
