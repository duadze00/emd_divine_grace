//* ======================================================
//* LOGIC AND SYNTAX
//* ======================================================
const now = Date.now();
const expiresAt = Date.now() + 24 * 60 * 60 * 1000;

if (now >= expiresAt) {
  console.log("Expired");
} else {
  console.log("Not Expired");
}

//* ======================================================
//* MINUTES, HOURS, DAYS AND WEEKS
//* ======================================================
// You can convert everything into milliseconds.

const second = 1000;
const minute = 60 * 1000;
const hour = 60 * minute;
const day = 24 * hour;
const week = 7 * day;

// ! NB: 1 second = 1000 milliseconds
// ! NB: 1 minutes = 60 seconds * 1000 milisecond
// ! NB: 1 hour = 60 minutes * 60 seconds * 1000 milisecond
// ! NB: 1 day = 24 hours * 60 minutes * 60 seconds * 1000 milisecond
// ! NB: 1 week = 7 days * 24 hours * 60 minutes * 60 seconds * 1000 milisecond

// Expire after 10 minutes
const expiresAt = Date.now() + 10 * minute;

// Expire after 3 hours
const expiresAt = Date.now() + 3 * hour;

// Expire after 2 days
const expiresAt = Date.now() + 2 * day;

// Expire after 2 weeks
const expiresAt = Date.now() + 2 * week;

//* ======================================================
//* MONTHS AND YEARS
//* ======================================================
// If you want one calendar month from now.
// Instead, use Javascript's Date.

const date = new Date();

date.setMonth(date.getMonth() + 1);

const expiresAt = date.getTime();

// For one year:
const date = new Date();

date.setFullYear(date.getFullYear() + 1);

const expiresAt = date.getTime();

//* ======================================================
//* REAL EXAMPLE
//* ======================================================

//* 1. Imagine you're building your own WhatsApp-like status system.

// A status could look like this:
const status = {
  id: 1,
  text: "Hello everyone!",
  createdAt: Date.now(),
  expiresAt: Date.now() + 24 * 60 * 60 * 1000,
};

// Then when you want to display statuses:
const now = Date.now();

if (status.expiresAt > now) {
  console.log(status.text);
}

//* 2. With an array of statuses
// Suppose you have:
const statuses = [
  {
    id: 1,
    text: "Good morning",
    expiresAt: Date.now() + 5000,
  },
  {
    id: 2,
    text: "I'm learning React",
    expiresAt: Date.now() + 10000,
  },
  {
    id: 3,
    text: "Hello",
    expiresAt: Date.now() - 5000,
  },
];

const now = Date.now();

const activeStatuses = statuses.filter((status) => status.expiresAt > now);

console.log(activeStatuses);

//* ======================================================
//* HERE'S AN IMPORTANT DISTINCTION
//* ======================================================
// There are actually two different things happening.

//* A. Making it disappear from the UI.
// You can use React:
const activeStatuses = statuses.filter(
  (status) => status.expiresAt > Date.now(),
);

//* B. Actually deleting it from the database
// DELETE FROM statuses
// WHERE expires_at <= NOW();
OR;
// SELECT *
// FROM statuses
// WHERE expires_at > NOW();

//* ======================================================
//* COUNTDOWN
//* ======================================================
// Suppose you want: Status expires in 23:45:12
// Now you can use setInterval().

const expiresAt = Date.now() + 60 * 60 * 1000;

const interval = setInterval(() => {
  const remaining = expiresAt - Date.now();

  if (remaining <= 0) {
    clearInterval(interval);
    console.log("Expired!");
    return;
  }

  console.log(remaining);
}, 1000);

//* ======================================================
//* MISTAKES TO AVOID
//* ======================================================

// ❌ Don't do this:
let minutes = 60;

setInterval(() => {
  minutes--;
}, 60000);

// ✅ Instead:
const expiresAt = Date.now() + 60 * 60 * 1000;
// and repeatedly calculate:
const remaining = expiresAt - Date.now();

// This same technique is used for WhatsApp statuses,
// temporary posts, OTP expiration, session expiration,
// JWT expiration, cache expiration, scheduled notifications,
// disappearing messages, subscriptions, trials,
// and many other systems.
