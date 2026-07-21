// =============== CREATE DATE OBJECT ===============
// Date objects are created with the new Date() constructor.
// There are 4 ways to create a new date object:

new Date();
// 1. new Date() creates a new date object with the current date and time:
const d = new Date();
console.log(d);

//2.  new Date(year, month, day, hours, minutes, seconds, milliseconds)
// new Date(year, month, ...) creates a new date object with a specified date and time.

// 7 numbers specify year, month, day, hour, minute, second, and millisecond (in that order)
const d1 = new Date(2018, 11, 24, 10, 33, 30, 0);
console.log(d1);
// 6 numbers specify year, month, day, hour, minute, second
new Date(2018, 11, 24, 10, 33, 30);
// 5 numbers specify year, month, day, hour, and minute:
new Date(2018, 11, 24, 10, 33);

// 4 numbers specify year, month, day, and hour:
new Date(2018, 11, 24, 10);

// 3 numbers specify year, month, and day:
new Date(2018, 11, 24);

// 2 numbers specify year and month:
new Date(2018, 11);

new Date(2018);

// 3. new Date(dateString)
// new Date(dateString) creates a new date object from a date string
let d2 = new Date("October 13, 2014 11:13:00");
console.log(d2);

// 4. new Date(milliseconds)
// new Date(milliseconds) creates a new date object as zero time plus milliseconds:

const d3 = new Date(0);
console.log(d3);

// =============== DATE METHODS ===============
// METHODS	            DESCRIPTION
// getFullYear()	    Get the year as a four digit number (yyyy)
// getMonth()	        Get the month as a number (0-11)
// getDate()	        Get the day as a number (1-31)
// getHours()	        Get the hour (0-23)
// getMinutes()	      Get the minute (0-59)
// getSeconds()	      Get the second (0-59)
// getMilliseconds()	Get the millisecond (0-999)
// getTime()	        Get the time (milliseconds since January 1, 1970)
// getDay()	          Get the weekday as a number (0-6)
// Date.now()	        Get the time. ECMAScript 5.

let date = new Date();
console.log(date.getTime());
console.log(date.getSeconds());
console.log(date.getMinutes());
console.log(date.getHours());
console.log(date.getDay());
console.log(date.getDate());
console.log(date.getMonth());
console.log(date.getMilliseconds());
console.log(date.getFullYear());
console.log(Date.now());

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

console.log(months[date.getMonth()]);

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
console.log(days[date.getDay()]);

// NB. The prototype constructor allows you to add new properties and methods to the Date() object.
Date.prototype.myMethod = function () {
  if (this.getMonth() == 0) {
    this.myProp = "January";
  }
  if (this.getMonth() == 1) {
    this.myProp = "February";
  }
  if (this.getMonth() == 2) {
    this.myProp = "March";
  }
  if (this.getMonth() == 3) {
    this.myProp = "April";
  }
  if (this.getMonth() == 4) {
    this.myProp = "May";
  }
  if (this.getMonth() == 5) {
    this.myProp = "June";
  }
  if (this.getMonth() == 6) {
    this.myProp = "July";
  }
  if (this.getMonth() == 7) {
    this.myProp = "August";
  }
  if (this.getMonth() == 8) {
    this.myProp = "September";
  }
  if (this.getMonth() == 9) {
    this.myProp = "October";
  }
  if (this.getMonth() == 10) {
    this.myProp = "November";
  }
  if (this.getMonth() == 11) {
    this.myProp = "December";
  }
};

// Make a Date object, then call the myMethod method:

var d = new Date();
d.myMethod();
var monthname = d.myPro;

// =============== UTC DATE METHODS ===============
// UTC date methods are used for working with UTC dates (Universal Time Zone dates)

// METHODS	                DESCRIPTION
// getUTCDate()	            Same as getDate(), but returns the UTC date
// getUTCDay()	            Same as getDay(), but returns the UTC day
// getUTCFullYear()	        Same as getFullYear(), but returns the UTC year
// getUTCHours()	          Same as getHours(), but returns the UTC hour
// getUTCMilliseconds()	    Same as getMilliseconds(), but returns the UTC milliseconds
// getUTCMinutes()	        Same as getMinutes(), but returns the UTC minutes
// getUTCMonth()	          Same as getMonth(), but returns the UTC month
// getUTCSeconds()	        Same as getSeconds(), but returns the UTC seconds

// =============== SET DATE METHODS ===============
// Set Date methods are used for setting a part of a date

// METHODS	                DESCRIPTION
// setDate()	              Set the day as a number (1-31)
// setFullYear()	          Set the year (optionally month and day)
// setHours()	              Set the hour (0-23)
// setMilliseconds()	      Set the milliseconds (0-999)
// setMinutes()	            Set the minutes (0-59)
// setMonth()	              Set the month (0-11)
// setSeconds()	            Set the seconds (0-59)
// setTime()	              Set the time (milliseconds since January 1, 1970)

console.log(date.setFullYear(2026, 10, 12));

// ============ Compare Dates ============
let text = "";
const today = new Date();
const someday = new Date();
someday.setFullYear(2100, 0, 14);

if (someday > today) {
  text = "Today is before January 14, 2100.";
} else {
  text = "Today is after January 14, 2100.";
}
console.log(text);

// =============== EXAMPLES ===============
function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

function myFunction() {
  var d = new Date();
  var x = document.getElementById("demo");
  var h = addZero(d.getHours());
  var m = addZero(d.getMinutes());
  var s = addZero(d.getSeconds());
  x.innerHTML = h + ":" + m + ":" + s;
}

myFunction();

var d = new Date();
var weekday = new Array();
weekday[0] = "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";

var n = weekday[d.getUTCDay()];
