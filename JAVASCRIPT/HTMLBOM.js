// ============================= JAVASCRIPT WINDOW - THE BROWSER OBJECT MODEL (BOM) =============================
// The Browser Object Model (BOM) allows JavaScript to "talk to" the browser.

// ==== THE WINDOW OBJECT ====
// The window object is supported by all browsers. It represents the browser's window

// NB. The document object (HTML DOM) is a property of the window object
window.document.getElementById("header");
// is the same as
document.getElementById("header");

// == WINDOW SIZE ==
// Two properties can be used to determine the size of the browser window and return the sizes in pixels.

window.innerHeight; // the inner height of the browser window
window.innerWidth; // the inner width of the browser window

let w = window.innerWidth;
let h = window.innerHeight;

// OTHER WINDOW METHODS
window.open(); // open a new window
window.close(); // close the current window
window.moveTo(); // move the current window
window.resizeTo(); // resize the current window

// == WINDOW SCREEN ==
// The window.screen object can be written without the window prefix.

// Properties
screen.width; // returns the width of the visitor's screen in pixels
screen.height; // returns the height of the visitor's screen in pixels
screen.availWidth; // returns the width of the visitor's screen, in pixels, minus interface features like the Windows Taskbar
screen.availHeight; // returns the height of the visitor's screen, in pixels, minus interface features like the Windows Taskbar
screen.colorDepth; // returns the number of bits used to display one color.
screen.pixelDepth; // returns the pixel depth of the screen.

document.getElementById("demo").innerHTML = "Screen Width: " + screen.width;
document.getElementById("demo").innerHTML = "Screen Height: " + screen.height;
document.getElementById("demo").innerHTML =
  "Available Screen Width: " + screen.availWidth;
document.getElementById("demo").innerHTML =
  "Available Screen Height: " + screen.availHeight;
document.getElementById("demo").innerHTML =
  "Screen Color Depth: " + screen.colorDepth;
document.getElementById("demo").innerHTML =
  "Screen Pixel Depth: " + screen.pixelDepth;

// == WINDOW LOCATION ==
// The window.location object can be used to get the current page address (URL) and to redirect the browser to a new page.

window.location.href; // returns the href (URL) of the current page
window.location.hostname; // returns the domain name of the web host
window.location.pathname; // returns the path and filename of the current page
window.location.protocol; // returns the web protocol used (http: or https:)
window.location.assign(); // loads a new document
window.location.port; // returns the number of the internet host port (of the current page)

// Load a new document
<html>
  <head>
    <script>
      function newDoc() {window.location.assign("https://www.w3schools.com")}
    </script>
  </head>
  <body>
    <input type="button" value="Load new document" onclick="newDoc()" />
  </body>
</html>;

// == WINDOW HISTORY ==
// The window.history object can be written without the window prefix

// To protect the privacy of the users, there are limitations to how JavaScript can access this object.

// Some methods
history.back(); // loads the previous URL in the history list.
history.forward(); // loads the next URL in the history list

// Create a back button on a page
<html>
  <head>
    <script>function goBack() {window.history.back()}</script>
  </head>
  <body>
    <input type="button" value="Back" onclick="goBack()" />
  </body>
</html>;

// Create a forward button on a page
<html>
  <head>
    <script>function goForward() {window.history.forward()}</script>
  </head>
  <body>
    <input type="button" value="Forward" onclick="goForward()" />
  </body>
</html>;

// == WINDOW NAVIGATION ==
// The window.navigator object contains information about the visitor's browser.

// The window.navigator object can be written without the window prefix.
navigator.appName;
navigator.appCodeName;
navigator.platform;

// = BROWSER COOKIES =
// The cookieEnabled property returns true if cookies are enabled, otherwise false:

document.getElementById("demo").innerHTML =
  "cookiesEnabled is " + navigator.cookieEnabled;

// = BROWSER APPLICATION NAME =
// The appName property returns the application name of the browser:

document.getElementById("demo").innerHTML =
  "navigator.appName is " + navigator.appName;

// = BROWSER APPLICATION CODE NAME =
// The appCodeName property returns the application code name of the browser

document.getElementById("demo").innerHTML =
  "navigator.appCodeName is " + navigator.appCodeName;

// = BROWSER ENGINE =
// The product property returns the product name of the browser engine

document.getElementById("demo").innerHTML =
  "navigator.product is " + navigator.product;

// = BROWSER VERSION =
// The appVersion property returns version information about the browser

document.getElementById("demo").innerHTML = navigator.appVersion;

// = BROWSER AGENT =
// The userAgent property returns the user-agent header sent by the browser to the server

document.getElementById("demo").innerHTML = navigator.userAgent;

// = BROWSER PLATFORM =
// The platform property returns the browser platform (operating system)

document.getElementById("demo").innerHTML = navigator.platform;

// = BROWSER LANGUAGE =
// The language property returns the browser's language

document.getElementById("demo").innerHTML = navigator.language;

// = BROWSER ONLINE =
// The onLine property returns true if the browser is online

document.getElementById("demo").innerHTML = navigator.onLine;

// = IS JAVA ENABLED =
// The javaEnabled() method returns true if Java is enabled

document.getElementById("demo").innerHTML = navigator.javaEnabled();

// === JAVASCRIPT POPUP BOXES ===
// JavaScript has three kind of popup boxes: Alert box, Confirm box, and Prompt box.

// == ALERT BOX ==
// An alert box is often used if you want to make sure information comes through to the user.

// When an alert box pops up, the user will have to click "OK" to proceed.

// Syntax
window.alert("sometext");
// The window.alert() method can be written without the window prefix.

alert("I am an alert box!");

// == CONFIRM BOX ==
// A confirm box is often used if you want the user to verify or accept something.

// When a confirm box pops up, the user will have to click either "OK" or "Cancel" to proceed.

// If the user clicks "OK", the box returns true. If the user clicks "Cancel", the box returns false.

// Syntax
window.confirm("sometext");
// The window.confirm() method can be written without the window prefix.

if (confirm("Press a button!")) {
  txt = "You pressed OK!";
} else {
  txt = "You pressed Cancel!";
}

// == PROMPT BOX ==
// A prompt box is often used if you want the user to input a value before entering a page.

// When a prompt box pops up, the user will have to click either "OK" or "Cancel" to proceed after entering an input value.

// If the user clicks "OK" the box returns the input value. If the user clicks "Cancel" the box returns null.

// Syntax
window.prompt("sometext", "defaultText");
// The window.prompt() method can be written without the window prefix.

let person = prompt("Please enter your name", "Harry Potter");
let text;
if (person == null || person == "") {
  text = "User cancelled the prompt.";
} else {
  text = "Hello " + person + "! How are you today?";
}

// == LINE BREAKS ==
// To display line breaks inside a popup box, use a back-slash followed by the character n.

alert("Hello\nHow are you?");

// === JAVASCRIPT TIMING EVENTS ===
// == TIMING EVENT ==
// The window object allows execution of code at specified time intervals.
// These time intervals are called timing events.

// The two key methods to use with JavaScript are:

setTimeout(Function, milliseconds);
// Executes a function, after waiting a specified number of milliseconds.

setInterval(Function, milliseconds);
// Same as setTimeout(), but repeats the execution of the function continuously.

// The setTimeout() and setInterval() are both methods of the HTML DOM Window object.

setTimeout(() => {
  console.log("This function too 3s before it was executed");
}, 3000);

setInterval(() => {
  console.log("This will be executed after every 3s");
}, 3000);

// == STOP THE EXECUTION ==
// The clearTimeout() method stops the execution of the function specified in setTimeout().

window.clearTimeout(timeoutVariable);
// The window.clearTimeout() method can be written without the window prefix.

// The clearTimeout() method uses the variable returned from setTimeout():
myVar = setTimeout(Function, milliseconds);
clearTimeout(myVar);

// If the function has not already been executed, you can stop the execution by calling the clearTimeout() method
<html>
  <button onclick="myVar = setTimeout(myFunction, 3000)">Try it</button>
  <button onclick="clearTimeout(myVar)">Stop it</button>
</html>;

let myVar = setInterval(Function, milliseconds);
clearInterval(myVar);

<html>
  <p id="demo"></p>
  <button onclick="clearInterval(myVar)">Stop time</button>
  <script>
    let myVar = setInterval(myTimer, 1000); function myTimer()
    {
      (document.getElementById("demo").innerHTML =
        new Date().toLocaleTimeString())
    }
  </script>
</html>;

// === JAVASCRIPT COOKIES ===
// Cookies let you store user information in web pages.

// == Create a Cookie with JavaScript ==
// JavaScript can create, read, and delete cookies with the document.cookie property.

// With JavaScript, a cookie can be created like this:
document.cookie = "username=John Doe";

// You can also add an expiry date (in UTC time). By default, the cookie is deleted when the browser is closed:
document.cookie = "username=John Doe; expires=Thu, 18 Dec 2013 12:00:00 UTC";

// With a path parameter, you can tell the browser what path the cookie belongs to. By default, the cookie belongs to the current page.
document.cookie =
  "username=John Doe; expires=Thu, 18 Dec 2013 12:00:00 UTC; path=/";

// == Read a Cookie with JavaScript ==
// With JavaScript, cookies can be read like this:
let x = document.cookie;

// == Change a Cookie with JavaScript ==
// With JavaScript, you can change a cookie the same way as you create it:
document.cookie =
  "username=John Smith; expires=Thu, 18 Dec 2013 12:00:00 UTC; path=/";

// == Delete a Cookie with JavaScript ==
// Deleting a cookie is very simple.

// You don't have to specify a cookie value when you delete a cookie.

// Just set the expires parameter to a past date:
document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

// A Function to Set a Cookie
// First, we create a function that stores the name of the visitor in a cookie variable:

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

// A Function to Get a Cookie
// Then, we create a function that returns the value of a specified cookie:

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

// A Function to Check a Cookie
// Last, we create the function that checks if a cookie is set.

// If the cookie is set it will display a greeting.

// If the cookie is not set, it will display a prompt box, asking for the name of the user, and stores the username cookie for 365 days, by calling the setCookie function:

function checkCookie() {
  let username = getCookie("username");
  if (username != "") {
    alert("Welcome again " + username);
  } else {
    username = prompt("Please enter your name:", "");
    if (username != "" && username != null) {
      setCookie("username", username, 365);
    }
  }
}

// All Together Now
function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function checkCookie() {
  let user = getCookie("username");
  if (user != "") {
    alert("Welcome again " + user);
  } else {
    user = prompt("Please enter your name:", "");
    if (user != "" && user != null) {
      setCookie("username", user, 365);
    }
  }
}
