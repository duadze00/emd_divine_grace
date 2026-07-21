// =============================== JS WEB APIs ===============================
// ===== WEB API =====
// API stands for Application Programming Interface.
// A Web API is an application programming interface for the Web.
// A Browser API can extend the functionality of a web browser.
// A Server API can extend the functionality of a web server.

// ============== WEB FORMS API ==============
// Constraint Validation DOM Methods

// PROPERTY	                DESCRIPTION
// checkValidity()	        Returns true if an input element contains valid data.
// setCustomValidity()	    Sets the validationMessage property of an input element.

// ===== The checkValidity() Method =====
<html>
  <input id="id1" type="number" min="100" max="300" required />
  <button onclick="myFunction()">OK</button>
  <p id="demo"></p>
</html>;

const message = document.getElementById("demo");
function myFunction() {
  let inputObject = document.getElementById("i1d");
  if (!inputObject.checkVisibility()) {
    message.innerHTML = inputObject.validationMessage;
  }
}

// Constraint Validation DOM Properties

// PROPERTY	              DESCRIPTION
// validity	              Contains boolean properties related to the validity of an input element.
// validationMessage	    Contains the message a browser will display when the validity is false.
// willValidate	          Indicates if an input element will be validated.

// Validity Properties
// The validity property of an input element contains a number of properties related to the validity of data:

// PROPERTY	              DESCRIPTION
// customError	          Set to true, if a custom validity message is set.
// patternMismatch	      Set to true, if an element's value does not match its pattern attribute.
// rangeOverflow	        Set to true, if an element's value is greater than its max attribute.
// rangeUnderflow	        Set to true, if an element's value is less than its min attribute.
// stepMismatch	          Set to true, if an element's value is invalid per its step attribute.
// tooLong	              Set to true, if an element's value exceeds its maxLength attribute.
// typeMismatch	          Set to true, if an element's value is invalid per its type attribute.
// valueMissing	          Set to true, if an element (with a required attribute) has no value.
// valid	                Set to true, if an element's value is valid.

// If the number in an input field is greater than 100 (the input's max attribute), display a message:
// The rangeOverflow Property
<div>
  <input id="id1" type="number" max="100" />
  <button onclick="myFunction()">OK</button>
  <p id="demo"></p>
</div>;

function myFunction() {
  let text = "Value OK";
  if (document.getElementById("id1").validity.rangeOverflow) {
    text = "Value too large";
  }
}

// If the number in an input field is less than 100 (the input's min attribute), display a message:
// The rangeUnderflow Property
<div>
  <input id="id1" type="number" min="100" />
  <button onclick="myFunction()">OK</button>
  <p id="demo"></p>
</div>;

function myFunction() {
  let text = "Value OK";
  if (document.getElementById("id1").validity.rangeUnderflow) {
    text = "Value too small";
  }
}

// ============== WEB HISTORY API ==============
// The History back() Method
// The back() method loads the previous URL in the windows.history list.

// It is the same as clicking the "back arrow" in your browser.
<html>
  <button onclick="myFunction()">Go Back</button>
</html>;
function myFunction() {
  window.history.back();
} // Go Back

// The History go() Method
// The go() method loads a specific URL from the history list:
<html>
  <button onclick="myFunction()">Go Back 2 Pages</button>
</html>;

function myFunction() {
  window.history.go(-2);
} // Go Back 2 Pages

// History Object Properties
// PROPERTY	       DESCRIPTION
// length	         Returns the number of URLs in the history list

// History Object Methods
// METHOD	         DESCRIPTION
// back()	         Loads the previous URL in the history list
// forward()	     Loads the next URL in the history list
// go()	           Loads a specific URL from the history list

// ============== WEB STORAGE API ==============
// The Web Storage API is a simple syntax for storing and retrieving data in the browser. It is very easy to use
localStorage.setItem("name", "John Doe");
localStorage.getItem("name");

// ===== LOCALSTORAGE OBJECT =====
// The localStorage object provides access to a local storage for a particular Web Site. It allows you to store, read, add, modify, and delete data items for that domain.

// The data is stored with no expiration date and will not be deleted when the browser is closed.

// == The setItem() Method ==
// The localStorage.setItem() method stores a data item in a storage.
// It takes a name and a value as parameters:

localStorage.setItem("name", "John Doe");

// == The getItem() Method ==
// The localStorage.getItem() method retrieves a data item from the storage.
// It takes a name as parameter

localStorage.getItem("name");

// Syntax
window.localStorage;

// Syntax for SAVING data to localStorage:
localStorage.setItem("key", "value");

// Syntax for READING data from localStorage:
var lastname = localStorage.getItem("key");

// Syntax for REMOVING data from localStorage:
localStorage.removeItem("key");

// ===== SESSIONSTORAGE OBJECT =====
// The sessionStorage object is identical to the localStorage object.
// The difference is that the sessionStorage object stores data for one session.
// The data is deleted when the browser is closed.

sessionStorage.getItem("name");

// == The setItem() Method ==
// The sessionStorage.setItem() method stores a data item in a storage.
// It takes a name and a value as parameters

sessionStorage.setItem("name", "John Doe");

// == The getItem() Method ==
// The sessionStorage.getItem() method retrieves a data item from the storage.
// It takes a name as parameter:

sessionStorage.getItem("name");

// ===== Storage Object Properties and Methods =====

// PROPERTY/METHOD	          DESCRIPTION
// key(n)	                    Returns the name of the nth key in the storage
// length	                    Returns the number of data items stored in the Storage object
// getItem(keyname)	          Returns the value of the specified key name
// setItem(keyname, value)	  Adds that key to the storage, or update that key's value if it already exists
// removeItem(keyname)	      Removes that key from the storage
// clear()	                  Empty all key out of the storage

// ============== WEB WORKER API ==============
// When executing scripts in an HTML page, the page becomes unresponsive until the script is finished.

// A web worker is a JavaScript that runs in the background, independently of other scripts, without affecting the performance of the page. You can continue to do whatever you want: clicking, selecting things, etc., while the web worker runs in the background

// ==== Check Web Worker Support ====
// Before creating a web worker, check whether the user's browser supports it:

if (typeof Worker !== "undefined") {
  // Yes! Web worker support!
  // Some code.....
} else {
  // Sorry! No Web Worker support..
}

// ==== Create a Web Worker File ====
// Now, let's create our web worker in an external JavaScript.
// Here, we create a script that counts.

let i = 0;
function timedCount() {
  i++;
  postMessage(i);
  setTimeout("timedCount()", 500);
}

timedCount();
// The important part of the code above is the postMessage() method - which is used to post a message back to the HTML page.

// ==== Create a Web Worker Object ====
// Now that we have the web worker file, we need to call it from an HTML page.
// The following lines checks if the worker already exists, if not - it creates a new web worker object and runs the code:

if (typeof w == "undefined") {
  w = new Worker("demo_workers.js");
}
// Then we can send and receive messages from the web worker.

// Add an "onmessage" event listener to the web worker.
w.onmessage = function (event) {
  document.getElementById("result").innerHTML = event.data;
};
// When the web worker posts a message, the code within the event listener is executed. The data from the web worker is stored in event data.

// ==== Terminate a Web Worker ====
// When a web worker object is created, it will continue to listen for messages (even after the external script is finished) until it is terminated.

// To terminate a web worker, and free browser/computer resources, use the terminate() method:
w.terminate();

// ==== Reuse the Web Worker ====
// If you set the worker variable to undefined, after it has been terminated, you can reuse the code:

w = undefined;

// Full Web Worker Example Code
<html>
  <body>
    <p>
      Count numbers: <output id="result"></output>
    </p>
    <button onclick="startWorker()">Start Worker</button>
    <button onclick="stopWorker()">Stop Worker</button>
  </body>
</html>;

let w;
function startWorker() {
  if (typeof w == "undefined") {
    w = new Worker("demo_workers.js");
  }
  w.onmessage = function (event) {
    document.getElementById("result").innerHTML = event.data;
  };
}
function stopWorker() {
  w.terminate();
  w = undefined;
}

// ============== WEB FETCH API ==============
// The Fetch API interface allows web browser to make HTTP requests to web servers.

// ===== A Fetch API =====
// The example below fetches a file and displays the content

fetch(file)
  .then((x) => x.text())
  .then((y) => myDisplay(y));

// Same as above but simpler to understand
async function getText(file) {
  let x = await fetch(file);
  let y = await x.text();
  myDisplay(y);
}

// Or even bettter: Use understandable names instead of x and y
async function getText(file) {
  let myObject = await fetch(file);
  let myText = await myObject.text();
  myDisplay(myText);
}

// ============== WEB GEOLOCATION API ==============
// ====== LOCATE THE USERS'S POSITION ======
// The HTML Geolocation API is used to get the geographical position of a user. Since this can compromise privacy, the position is not available unless the user approves it.
// Note: Geolocation is most accurate for devices with GPS, like smartphone.

// === USING THE GEOLOCATION API ===
// The getCurrentPosition() method is used to return the user's position.

// The example below returns the latitude and longitude of the user's position:

const x = document.getElementById("demo");
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  x.innerHTML =
    "Latitude: " +
    position.coords.latitude +
    "<br>Longitude: " +
    position.coords.longitude;
}

// == HANDLING ERRORS AND REJECTIONS ==
// The second parameter of the getCurrentPosition() method is used to handle errors. It specifies a function to run if it fails to get the user's location:

function showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      x.innerHTML = "User denied the request for Geolocation.";
      break;
    case error.POSITION_UNAVAILABLE:
      x.innerHTML = "Location information is unavailable.";
      break;
    case error.TIMEOUT:
      x.innerHTML = "The request to get user location timed out.";
      break;
    case error.UNKNOWN_ERROR:
      x.innerHTML = "An unknown error occurred.";
      break;
  }
}

// == DISPLAYING THE RESULT IN A MAP ==
// To display the result in a map, you need access to a map service, like Google Maps.

// In the example below, the returned latitude and longitude is used to show the location in a Google Map (using a static image):

function showPosition(position) {
  let latlon = position.coords.latitude + "," + position.coords.longitude;

  let img_url = `"https://maps.googleapis.com/maps/api/staticmap?center=
  "+latlon+"&zoom=14&size=400x300&sensor=false&key=YOUR_KEY"`;

  document.getElementById("mapholder").innerHTML =
    "<img src='" + img_url + "'>";
}

// == LOCATION - SPECIFIC INFORMATION ==
// This page has demonstrated how to show a user's position on a map.

// Geolocation is also very useful for location-specific information, like:
// Up-to-date local information
// Showing Points-of-interest near the user
// Turn-by-turn navigation (GPS)

// == The getCurrentPosition() Method - Return Data ==
// The getCurrentPosition() method returns an object on success. The latitude, longitude and accuracy properties are always returned. The other properties are returned if available:

// PROPERTY                       RETURNS
// coords.latitude	              The latitude as a decimal number (always returned)
// coords.longitude	              The longitude as a decimal number (always returned)
// coords.accuracy	              The accuracy of position (always returned)
// coords.altitude	              The altitude in meters above the mean sea level (returned if available)
// coords.altitudeAccuracy	      The altitude accuracy of position (returned if available)
// coords.heading	                The heading as degrees clockwise from North (returned if available)
// coords.speed	                  The speed in meters per second (returned if available)
// timestamp	                    The date/time of the response (returned if available)

// Geolocation Object - Other interesting Methods
// The Geolocation object also has other interesting methods:
watchPosition(); // Returns the current position of the user and continues to return updated position as the user moves (like the GPS in a car).
clearWatch(); // Stops the watchPosition() method.

// The example below shows the watchPosition() method. You need an accurate GPS device to test this (like smartphone):

const x = document.getElementById("demo");
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}
function showPosition(position) {
  x.innerHTML =
    "Latitude: " +
    position.coords.latitude +
    "<br>Longitude: " +
    position.coords.longitude;
}
