/**
 * SETTING AN EXPIRATION TIME IN JAVASCRIPT
 *
 * 1. JavaScript Month Rollover Edge Case (CRITICAL):
 *    - Standard JS Date manipulation can cause bugs when adding months. For example, if today
 *      is Jan 31st and you add 1 month (`setMonth(getMonth() + 1)`), JS jumps to Feb 31st.
 *      Since Feb 31st doesn't exist, it auto-corrects to March 3rd!
 *    - FIX: We save the target day of the month before modifying the month, and explicitly
 *      clamp it to the last valid day of the target month if an overflow occurs.
 *
 * 2. Return Values & Cleanup (Memory Management):
 *    - In the original snippet, `setInterval` ran inside the function but the interval ID was
 *      never returned. If this function is used in a real app (like React, Vue, or a node server),
 *      you won't be able to stop the timer from the outside, creating memory leaks.
 *    - FIX: We return an object containing `expiresAt`, `expiryString`, and a `stop()` handle.
 *
 * 3. Human-Readable Time Breakdown:
 *    - Printing raw milliseconds (`remaining`) to the user/console isn't helpful.
 *    - FIX: Added helper logic to format milliseconds into readable Years, Days, Hours,
 *      Minutes, and Seconds.
 *
 * 4. Precision Drift (Timer Lag):
 *    - `setInterval` with a 1000ms delay is NOT guaranteed to run every exact 1000ms due to CPU
 *      scheduling, event loop blocking, or browser tab throttling in the background.
 *    - FIX: Always calculate `remaining = expiresAt - Date.now()` inside the loop (as you correctly
 *      did) rather than decrementing a counter variable, ensuring absolute time accuracy.
 *
 * 5. Persistence across Sessions:
 *    - Note: In-memory JavaScript timers resets if the browser reloads or the server restarts.
 *      To keep an expiration accurate across sessions, store the resulting `expiresAt` (Unix timestamp)
 *      in a database or `localStorage`, and recalculate the remaining time when the app reloads.
 */

function createExpirationTracker({
  years = 0,
  months = 0,
  days = 0,
  hours = 0,
  minutes = 0,
  seconds = 0,
  onTick = null,
  onExpire = null,
} = {}) {
  //* ACCURATE DATE MATH
  const date = new Date();

  // Handle Years, Hours, Minutes, Seconds (These do not suffer from month-end bugs)
  date.setFullYear(date.getFullYear() + years);
  date.setHours(date.getHours() + hours);
  date.setMinutes(date.getMinutes() + minutes);
  date.setSeconds(date.getSeconds() + seconds);
  date.setDate(date.getDate() + days);

  // Handle Months Safely (Prevents Jan 31 -> Feb 28/29 overflow bug)
  if (months !== 0) {
    const currentDay = date.getDate();
    date.setMonth(date.getMonth() + months);

    // If the day changed unexpectedly after setting month, snap back to last day of target month
    if (date.getDate() !== currentDay) {
      date.setDate(0);
    }
  }

  //* EXPIRATION TIMESTAMPS
  // Unix timestamp (milliseconds since Jan 1, 1970). Best for storage & comparison.
  const expiresAt = date.getTime();

  // Localized human-readable representation for UI display
  const expiryString = date.toLocaleString();

  console.log(
    `[Expiration set for]: ${expiryString} (Timestamp: ${expiresAt})`,
  );

  //* FORMATTING REMAINING TIME
  // Converts raw milliseconds into readable structural units
  const formatRemainingTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const sec = totalSeconds % 60;
    const totalMinutes = Math.floor(totalSeconds / 60);
    const min = totalMinutes % 60;
    const totalHours = Math.floor(totalMinutes / 60);
    const hrs = totalHours % 24;
    const totalDays = Math.floor(totalHours / 24);
    const d = totalDays % 365;
    const yrs = Math.floor(totalDays / 365);

    return {
      years: yrs,
      days: d,
      hours: hrs,
      minutes: min,
      seconds: sec,
      totalMs: ms,
      formatted: `${yrs}y ${d}d ${hrs}h ${min}m ${sec}s`,
    };
  };

  //* COUNTDOWN TIMER ENGINE
  let intervalId = null;

  const startCountdown = () => {
    // Run an immediate check before waiting for the first 1-second interval tick
    const initialCheck = expiresAt - Date.now();
    if (initialCheck <= 0) {
      console.log("Status: Expired immediately.");
      if (typeof onExpire === "function") onExpire();
      return;
    }

    intervalId = setInterval(() => {
      // Recalculate directly against absolute system clock to prevent timer drift
      const currentTime = Date.now();
      const remainingMs = expiresAt - currentTime;

      if (remainingMs > 0) {
        const timeData = formatRemainingTime(remainingMs);

        // Output formatted remaining string to console
        console.log(`Time remaining: ${timeData.formatted}`);

        // Execute optional custom callback (useful for updating UI components)
        if (typeof onTick === "function") {
          onTick(timeData);
        }
      } else {
        console.log("Status: Expired");
        clearInterval(intervalId);
        intervalId = null;

        // Trigger completion callback
        if (typeof onExpire === "function") {
          onExpire();
        }
      }
    }, 1000);
  };

  // Start ticking immediately
  startCountdown();

  //* CLEANUP AND LIFECYCLE MANAGEMENT
  // Return control objects so the calling context can stop execution when needed
  return {
    expiresAt,
    expiryString,
    stop: () => {
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
        console.log("Timer manually stopped.");
      }
    },
  };
}

//* ==========================================
//* EXAMPLE USAGE / EXECUTION DEMO
//* ==========================================

// Setting target: 4 years, 1 month, and 5 seconds from right now
const tracker = createExpirationTracker({
  years: 4,
  months: 1,
  seconds: 5,
  onTick: (remaining) => {
    // Callback fires every second with formatted structured data
    // e.g., updates UI elements like document.getElementById('timer').innerText = remaining.formatted;
  },
  onExpire: () => {
    // Callback fires when timer hits 0
    console.log("Action triggered: Access rights revoked / token expired.");
  },
});

// To stop the interval manually anytime (e.g., user leaves page), call:
tracker.stop();

// date.setFullYear(date.getFullYear() + 4);
// date.setMonth(date.getMonth() + 1);
// date.setDate(date.getDate() + 10);
// date.setHours(date.getHours() + 2);
// date.setMinutes(date.getMinutes() + 30);
// date.setSeconds(date.getSeconds() + 5);
