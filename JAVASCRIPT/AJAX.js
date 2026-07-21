// ======================================================
// AJAX (ASYNCHRONOUS JAVASCRIPT AND XML)
// ======================================================

// AJAX = Asynchronous JavaScript And XML
// AJAX is NOT a programming language.

// AJAX uses:
// 1. XMLHttpRequest object (to communicate with a server)
// 2. JavaScript
// 3. HTML DOM

// AJAX allows web pages to:
// - Update content without reloading the page
// - Send data to a server
// - Receive data from a server
// - Work in the background

// ======================================================
// CREATING AN XMLHttpRequest OBJECT
// ======================================================

// Syntax
const xhttp = new XMLHttpRequest();
// Example
const request = new XMLHttpRequest();
console.log(request);

// ======================================================
// AJAX CALLBACK FUNCTIONS
// ======================================================

// A callback function is a function passed into another function
// and executed later.

// AJAX uses callbacks because server responses take time.

// Example
const xhttp1 = new XMLHttpRequest();
xhttp1.onload = function () {
  console.log("Response received");
};

// ======================================================
// SENDING A REQUEST
// ======================================================

// open(method, url)
// send()

const xhttp2 = new XMLHttpRequest();
xhttp2.open("GET", "ajax_info.txt");
xhttp2.send();

// ======================================================
// COMPLETE AJAX EXAMPLE
// ======================================================

const xhttp3 = new XMLHttpRequest();
xhttp3.onload = function () {
  console.log(this.responseText);
};
xhttp3.open("GET", "ajax_info.txt");
xhttp3.send();

// ======================================================
// SAME ORIGIN POLICY
// ======================================================

// For security reasons, browsers usually block requests
// to different domains unless the server allows it
// through CORS (Cross-Origin Resource Sharing).

// Example:
// Website:
// https://example.com

// Allowed:
// https://example.com/data.json

// Not automatically allowed:
// https://anotherwebsite.com/data.json

// ======================================================
// XMLHttpRequest METHODS
// ======================================================

/*
new XMLHttpRequest()  // Creates a new XMLHttpRequest object
abort()  // Cancels the current request
getAllResponseHeaders()  // Returns all response headers
getResponseHeader(header)  // Returns a specific response header
open(method, url, async, user, password)  // Initializes a request
send()  // Sends a GET request
send(data)  // Sends a POST request
setRequestHeader(name, value)  // Adds an HTTP header
*/

// ======================================================
// open() METHOD
// ======================================================

/*
open(method, url, async, user, password)

method   = GET or POST
url      = file location
async    = true or false
user     = optional username
password = optional password
*/

// Example
const xhttp4 = new XMLHttpRequest();
xhttp4.open("GET", "users.json", true);

// ======================================================
// send() METHOD
// ======================================================

// GET request
const xhttp5 = new XMLHttpRequest();
xhttp5.open("GET", "users.json");
xhttp5.send();

// POST request
const xhttp6 = new XMLHttpRequest();
xhttp6.open("POST", "save.php");
xhttp6.send();

// ======================================================
// setRequestHeader()
// ======================================================

// Used mostly with POST requests
const xhttp7 = new XMLHttpRequest();
xhttp7.open("POST", "save.php");
xhttp7.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
xhttp7.send("firstName=Eric&lastName=Duadze");

// ======================================================
// XMLHttpRequest PROPERTIES
// ======================================================

/*
onload  // Runs when the request successfully completes
onreadystatechange  // Runs whenever readyState changes
readyState  // Shows request status
responseText  // Returns response as text
responseXML  // Returns response as XML
status  // Returns HTTP status code
statusText  // Returns HTTP status text
*/

// ======================================================
// readyState VALUES
// ======================================================

/*
0 = Request not initialized
1 = Server connection established
2 = Request received
3 = Processing request
4 = Request finished and response ready
*/

// ======================================================
// HTTP STATUS CODES
// ======================================================

/*
200 = OK
201 = Created
204 = No Content
301 = Moved Permanently
302 = Found
400 = Bad Request
401 = Unauthorized
403 = Forbidden
404 = Not Found
500 = Internal Server Error
*/

// ======================================================
// onload PROPERTY
// ======================================================

// Runs after request successfully finishes
const xhttp8 = new XMLHttpRequest();
xhttp8.onload = function () {
  document.getElementById("demo").innerHTML = this.responseText;
};
xhttp8.open("GET", "ajax_info.txt");
xhttp8.send();

// ======================================================
// MULTIPLE CALLBACK FUNCTIONS
// ======================================================

// Reusable AJAX function
loadDoc("file1.txt", displayFile1);
loadDoc("file2.txt", displayFile2);
function loadDoc(url, callback) {
  const xhttp = new XMLHttpRequest();
  xhttp.onload = function () {
    callback(this);
  };
  xhttp.open("GET", url);
  xhttp.send();
}
function displayFile1(xhttp) {
  console.log(xhttp.responseText);
}
function displayFile2(xhttp) {
  console.log(xhttp.responseText);
}

// ======================================================
// onreadystatechange PROPERTY
// ======================================================

// Fires every time readyState changes
function loadDocument() {
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    console.log("readyState:", this.readyState, "status:", this.status);
    if (this.readyState === 4 && this.status === 200) {
      document.getElementById("demo").innerHTML = this.responseText;
    }
  };

  xhttp.open("GET", "ajax_info.txt");
  xhttp.send();
}

// ======================================================
// GET REQUESTS
// ======================================================

// Simple GET request
const getRequest = new XMLHttpRequest();
getRequest.open("GET", "demo_get.php");
getRequest.send();

// ======================================================
// GET REQUEST WITH PARAMETERS
// ======================================================

// Data is sent through the URL
const searchRequest = new XMLHttpRequest();
searchRequest.open("GET", "search.php?name=Eric&country=Ghana");
searchRequest.send();

// ======================================================
// POST REQUESTS
// ======================================================

// Simple POST request
const postRequest = new XMLHttpRequest();
postRequest.open("POST", "demo_post.php");
postRequest.send();

// ======================================================
// POST REQUEST WITH DATA
// ======================================================

const saveRequest = new XMLHttpRequest();
saveRequest.open("POST", "save.php");
saveRequest.setRequestHeader(
  "Content-Type",
  "application/x-www-form-urlencoded",
);
saveRequest.send("firstName=Eric&lastName=Duadze");

// ======================================================
// ASYNCHRONOUS REQUESTS
// ======================================================

// RECOMMENDED
const asyncRequest = new XMLHttpRequest();
asyncRequest.open("GET", "ajax_info.txt", true);
asyncRequest.send();

// ======================================================
// SYNCHRONOUS REQUESTS
// ======================================================

// NOT RECOMMENDED
const syncRequest = new XMLHttpRequest();
syncRequest.open("GET", "ajax_info.txt", false);
syncRequest.send();
console.log(syncRequest.responseText);

// Why avoid synchronous requests
// - Blocks the browser
// - Freezes the UI
// - Poor user experience
// - Deprecated in many situations

// ======================================================
// responseText PROPERTY
// ======================================================

// Returns server response as a string
const textRequest = new XMLHttpRequest();
textRequest.onload = function () {
  console.log(this.responseText);
};
textRequest.open("GET", "ajax_info.txt");
textRequest.send();

// ======================================================
// responseXML PROPERTY
// ======================================================

// Returns XML response as an XML DOM object
const xmlRequest = new XMLHttpRequest();
xmlRequest.onload = function () {
  const xmlDoc = this.responseXML;
  const artists = xmlDoc.getElementsByTagName("ARTIST");
  let output = "";
  for (let i = 0; i < artists.length; i++) {
    output += artists[i].childNodes[0].nodeValue + "<br>";
  }
  document.getElementById("demo").innerHTML = output;
};
xmlRequest.open("GET", "cd_catalog.xml");
xmlRequest.send();

// ======================================================
// SERVER RESPONSE METHODS
// ======================================================

/*
getResponseHeader(headerName)   // Returns a specific header
getAllResponseHeaders()         // Returns all headers
*/

// ======================================================
// getAllResponseHeaders()
// ======================================================

const headersRequest = new XMLHttpRequest();
headersRequest.onload = function () {
  document.getElementById("demo").innerHTML = this.getAllResponseHeaders();
};
headersRequest.open("GET", "ajax_info.txt");
headersRequest.send();

// ======================================================
// getResponseHeader()
// ======================================================

const headerRequest = new XMLHttpRequest();
headerRequest.onload = function () {
  document.getElementById("demo").innerHTML =
    this.getResponseHeader("Last-Modified");
};
headerRequest.open("GET", "ajax_info.txt");
headerRequest.send();

// ======================================================
// IMPORTANT AJAX METHODS SUMMARY
// ======================================================

/*
open()                      //   Initializes a request
send()                      //   Sends the request
abort()                     //   Cancels a request
setRequestHeader()          //   Adds HTTP headers
getResponseHeader()         //   Gets one response header
getAllResponseHeaders()     //   Gets all response headers
*/

// ======================================================
// IMPORTANT AJAX PROPERTIES SUMMARY
// ======================================================

/*
onload
onreadystatechange
readyState
responseTex // 
responseXML
status
statusText
*/

// ======================================================
// AJAX XML EXAMPLE
// ======================================================
// AJAX can be used to load and work with XML files.

// Example:
// Load an XML file and display its contents in an HTML table.

function loadDoc() {
  const xhttp = new XMLHttpRequest();
  xhttp.onload = function () {
    displayXMLData(this);
  };
  xhttp.open("GET", "cd_catalog.xml");
  xhttp.send();
}

function displayXMLData(xml) {
  const xmlDoc = xml.responseXML;
  const cds = xmlDoc.getElementsByTagName("CD");
  let table = "<tr><th>Artist</th><th>Title</th></tr>";
  for (let i = 0; i < cds.length; i++) {
    table +=
      "<tr>" +
      "<td>" +
      cds[i].getElementsByTagName("ARTIST")[0].childNodes[0].nodeValue +
      "</td>" +
      "<td>" +
      cds[i].getElementsByTagName("TITLE")[0].childNodes[0].nodeValue +
      "</td>" +
      "</tr>";
  }
  document.getElementById("demo").innerHTML = table;
}

// ======================================================
// AJAX PHP EXAMPLE
// ======================================================

// HTML
<div>
  <p>Start typing a name:</p>
  <p>
    Suggestions:
    <span id="txtHint"></span>
  </p>
  <form>
    First Name:
    <input type="text" onkeyup="showHint(this.value)" />
  </form>
</div>;

// ======================================================
// JAVASCRIPT
// ======================================================

function showHint(str) {
  // If input is empty
  if (str.length === 0) {
    document.getElementById("txtHint").innerHTML = "";
    return;
  }
  const xmlhttp = new XMLHttpRequest();
  xmlhttp.onload = function () {
    document.getElementById("txtHint").innerHTML = this.responseText;
  };
  xmlhttp.open("GET", "gethint.php?q=" + str);
  xmlhttp.send();
}

// ======================================================
// PHP FILE (gethint.php)
// ======================================================

/*

<?php

// Array of names

$names = [
  "Anna",
  "Brittany",
  "Cinderella",
  "Diana",
  "Eva",
  "Fiona",
  "Gunda",
  "Hege",
  "Inga",
  "Johanna",
  "Kitty",
  "Linda",
  "Nina",
  "Ophelia",
  "Petunia",
  "Amanda",
  "Raquel",
  "Cindy",
  "Doris",
  "Eve",
  "Evita",
  "Sunniva",
  "Tove",
  "Unni",
  "Violet",
  "Liza",
  "Elizabeth",
  "Ellen",
  "Wenche",
  "Vicky"
];

// Get user input

$q = $_REQUEST["q"];

$hint = "";

// Search names

if ($q !== "") {

  $q = strtolower($q);

  $len = strlen($q);

  foreach ($names as $name) {

    if (
      stristr(
        $q,
        substr($name, 0, $len)
      )
    ) {

      if ($hint === "") {
        $hint = $name;
      } else {
        $hint .= ", " . $name;
      }
    }
  }
}

// Output result

echo $hint === ""
  ? "No suggestion"
  : $hint;

?>



// ======================================================
// HOW THE PHP EXAMPLE WORKS
// ======================================================

/*
1. User types in the input box.
2. onkeyup triggers showHint().
3. JavaScript sends a request to:
   gethint.php?q=value
4. PHP searches matching names.
5. PHP returns suggestions.
6. AJAX inserts result into #txtHint.
*/

// ======================================================
// AJAX ASP EXAMPLE
// ======================================================

// HTML
<div>
  <p>Start typing a name:</p>
  <p>
    Suggestions:
    <span id="txtHint"></span>
  </p>
  <form>
    First Name:
    <input type="text" onkeyup="showHint(this.value)" />
  </form>
</div>;

// ======================================================
// JAVASCRIPT
// ======================================================

function showHint(str) {
  if (str.length === 0) {
    document.getElementById("txtHint").innerHTML = "";
    return;
  }
  const xmlhttp = new XMLHttpRequest();
  xmlhttp.onload = function () {
    document.getElementById("txtHint").innerHTML = this.responseText;
  };
  xmlhttp.open("GET", "gethint.asp?q=" + str);
  xmlhttp.send();
}

// ======================================================
// ASP FILE (gethint.asp)
// ======================================================

/*

<%

response.expires = -1

dim a(30)

a(1)="Anna"
a(2)="Brittany"
a(3)="Cinderella"
a(4)="Diana"
a(5)="Eva"
a(6)="Fiona"
a(7)="Gunda"
a(8)="Hege"
a(9)="Inga"
a(10)="Johanna"
a(11)="Kitty"
a(12)="Linda"
a(13)="Nina"
a(14)="Ophelia"
a(15)="Petunia"
a(16)="Amanda"
a(17)="Raquel"
a(18)="Cindy"
a(19)="Doris"
a(20)="Eve"
a(21)="Evita"
a(22)="Sunniva"
a(23)="Tove"
a(24)="Unni"
a(25)="Violet"
a(26)="Liza"
a(27)="Elizabeth"
a(28)="Ellen"
a(29)="Wenche"
a(30)="Vicky"

q = ucase(
      request.querystring("q")
    )

if len(q) > 0 then

  hint = ""

  for i = 1 to 30

    if q = ucase(
             mid(
               a(i),
               1,
               len(q)
             )
           ) then

      if hint = "" then
        hint = a(i)
      else
        hint = hint & ", " & a(i)
      end if

    end if

  next

end if

if hint = "" then
  response.write("No suggestion")
else
  response.write(hint)
end if

%>

*/

// ======================================================
// HOW THE ASP EXAMPLE WORKS
// ======================================================

/*
1. User types a name.
2. AJAX sends request to:
   gethint.asp?q=value
3. ASP searches matching names.
4. ASP returns suggestions.
5. AJAX displays suggestions.
*/

// ======================================================
// AJAX DATABASE EXAMPLE
// ======================================================
// HTML Example
<div>
  <select onchange="showCustomer(this.value)">
    <option value="">Select a customer:</option>
    <option value="ALFKI">ALFKI</option>
    <option value="NORTS">NORTS</option>
    <option value="WOLZA">WOLZA</option>
  </select>
  <div id="txtHint"></div>
</div>;

// ======================================================
// JAVASCRIPT
// ======================================================

function showCustomer(customerID) {
  if (customerID === "") {
    document.getElementById("txtHint").innerHTML = "";
    return;
  }
  const xhttp = new XMLHttpRequest();
  xhttp.onload = function () {
    document.getElementById("txtHint").innerHTML = this.responseText;
  };
  xhttp.open("GET", "getcustomer.php?q=" + customerID);
  xhttp.send();
}

// ======================================================
// HOW THE DATABASE EXAMPLE WORKS
// ======================================================

/*
1. User selects a customer.
2. onchange triggers showCustomer().
3. AJAX sends:
   getcustomer.php?q=ALFKI
4. PHP queries the database.
5. Database returns customer record.
6. PHP formats the result.
7. AJAX inserts result into page.
*/

// ======================================================
// PHP DATABASE FILE
// (getcustomer.php)
// ======================================================

/*

<?php

$mysqli = new mysqli(
  "servername",
  "username",
  "password",
  "dbname"
);

if ($mysqli->connect_error) {
  exit("Could not connect");
}

$sql = "
SELECT
customerid,
companyname,
contactname,
address,
city,
postalcode,
country
FROM customers
WHERE customerid = ?
";

$stmt = $mysqli->prepare($sql);

$stmt->bind_param(
  "s",
  $_GET["q"]
);

$stmt->execute();

$stmt->store_result();

$stmt->bind_result(
  $cid,
  $cname,
  $name,
  $address,
  $city,
  $postalcode,
  $country
);

$stmt->fetch();

echo "<table>";

echo "<tr>";
echo "<th>Customer ID</th>";
echo "<td>$cid</td>";
echo "</tr>";

echo "<tr>";
echo "<th>Company</th>";
echo "<td>$cname</td>";
echo "</tr>";

echo "<tr>";
echo "<th>Contact</th>";
echo "<td>$name</td>";
echo "</tr>";

echo "<tr>";
echo "<th>Address</th>";
echo "<td>$address</td>";
echo "</tr>";

echo "<tr>";
echo "<th>City</th>";
echo "<td>$city</td>";
echo "</tr>";

echo "<tr>";
echo "<th>Postal Code</th>";
echo "<td>$postalcode</td>";
echo "</tr>";

echo "<tr>";
echo "<th>Country</th>";
echo "<td>$country</td>";
echo "</tr>";

echo "</table>";

$stmt->close();

?>

*/

// ======================================================
// AJAX DATABASE FLOW
// ======================================================

/*
Browser
   ↓
AJAX Request
   ↓
PHP Server
   ↓
Database Query
   ↓
Database Result
   ↓
PHP Output
   ↓
AJAX Response
   ↓
Update Web Page
*/

// ======================================================
// XML APPLICATIONS
// ======================================================
// XML can be loaded from a server using AJAX.

// After loading XML, JavaScript can:
// 1. Read XML data
// 2. Display XML data
// 3. Search XML data
// 4. Navigate XML nodes
// 5. Update page content dynamically

// ======================================================
// DISPLAY XML DATA IN AN HTML TABLE
// ======================================================

// HTML
<div>
  <table id="demo"></table>
  <button onclick="loadXMLDoc()">Load CDs</button>
</div>;

// ======================================================
// JAVASCRIPT
// ======================================================

function loadXMLDoc() {
  const xmlhttp = new XMLHttpRequest();
  xmlhttp.onload = function () {
    const xmlDoc = this.responseXML;
    const cds = xmlDoc.getElementsByTagName("CD");
    displayTable(cds);
  };
  xmlhttp.open("GET", "cd_catalog.xml");
  xmlhttp.send();
}

// ======================================================
// DISPLAY XML DATA IN TABLE
// ======================================================

function displayTable(cds) {
  let table = "<tr>" + "<th>Artist</th>" + "<th>Title</th>" + "</tr>";
  for (let i = 0; i < cds.length; i++) {
    table +=
      "<tr>" +
      "<td>" +
      cds[i].getElementsByTagName("ARTIST")[0].childNodes[0].nodeValue +
      "</td>" +
      "<td>" +
      cds[i].getElementsByTagName("TITLE")[0].childNodes[0].nodeValue +
      "</td>" +
      "</tr>";
  }
  document.getElementById("demo").innerHTML = table;
}

// ======================================================
// DISPLAY THE FIRST CD
// ======================================================

// HTML
<div id="showCD"></div>;

// ======================================================
// JAVASCRIPT
// ======================================================
const xhttp = new XMLHttpRequest();
xhttp.onload = function () {
  const xmlDoc = this.responseXML;
  const cds = xmlDoc.getElementsByTagName("CD");
  showCD(cds, 0);
};
xhttp.open("GET", "cd_catalog.xml");
xhttp.send();

// ======================================================
// SHOW ONE CD
// ======================================================

function showCD(cds, index) {
  document.getElementById("showCD").innerHTML =
    "Artist: " +
    cds[index].getElementsByTagName("ARTIST")[0].childNodes[0].nodeValue +
    "<br><br>" +
    "Title: " +
    cds[index].getElementsByTagName("TITLE")[0].childNodes[0].nodeValue +
    "<br><br>" +
    "Year: " +
    cds[index].getElementsByTagName("YEAR")[0].childNodes[0].nodeValue;
}

// ======================================================
// NAVIGATE BETWEEN CDS
// ======================================================

// Global variables

let cdCollection;
let currentIndex = 0;
let totalCDs = 0;

// ======================================================
// LOAD XML FILE
// ======================================================

function loadCDCatalog() {
  const xmlhttp = new XMLHttpRequest();
  xmlhttp.onload = function () {
    const xmlDoc = this.responseXML;
    cdCollection = xmlDoc.getElementsByTagName("CD");
    totalCDs = cdCollection.length;
    displayCD(currentIndex);
  };
  xmlhttp.open("GET", "cd_catalog.xml");
  xmlhttp.send();
}

// ======================================================
// DISPLAY CURRENT CD
// ======================================================

function displayCD(index) {
  document.getElementById("showCD").innerHTML =
    "Artist: " +
    cdCollection[index].getElementsByTagName("ARTIST")[0].childNodes[0]
      .nodeValue +
    "<br><br>" +
    "Title: " +
    cdCollection[index].getElementsByTagName("TITLE")[0].childNodes[0]
      .nodeValue +
    "<br><br>" +
    "Year: " +
    cdCollection[index].getElementsByTagName("YEAR")[0].childNodes[0].nodeValue;
}

// ======================================================
// NEXT CD
// ======================================================

function next() {
  if (currentIndex < totalCDs - 1) {
    currentIndex++;
    displayCD(currentIndex);
  }
}

// ======================================================
// PREVIOUS CD
// ======================================================

function previous() {
  if (currentIndex > 0) {
    currentIndex--;
    displayCD(currentIndex);
  }
}

// ======================================================
// HTML FOR NAVIGATION
// ======================================================
<html>
  <button onclick="previous()">Previous</button>
  <button onclick="next()">Next</button>
  <div id="showCD"></div>
</html>;

// ======================================================
// SHOW ALBUM INFORMATION WHEN CLICKING A CD
// ======================================================

// HTML
<div>
  <table id="demo"></table>
  <div id="showCD"></div>
</div>;

// ======================================================
// LOAD XML FILE
// ======================================================

function loadAlbumList() {
  const xmlhttp = new XMLHttpRequest();
  xmlhttp.onload = function () {
    const xmlDoc = this.responseXML;
    const cds = xmlDoc.getElementsByTagName("CD");
    buildAlbumTable(cds);
  };
  xmlhttp.open("GET", "cd_catalog.xml");
  xmlhttp.send();
}

// ======================================================
// BUILD CLICKABLE TABLE
// ======================================================

function buildAlbumTable(cds) {
  let table = "<tr>" + "<th>Artist</th>" + "<th>Title</th>" + "</tr>";
  for (let i = 0; i < cds.length; i++) {
    table +=
      "<tr onclick='displayAlbum(" +
      i +
      ")'>" +
      "<td>" +
      cds[i].getElementsByTagName("ARTIST")[0].childNodes[0].nodeValue +
      "</td>" +
      "<td>" +
      cds[i].getElementsByTagName("TITLE")[0].childNodes[0].nodeValue +
      "</td>" +
      "</tr>";
  }
  document.getElementById("demo").innerHTML = table;
  window.albumCollection = cds;
}

// ======================================================
// DISPLAY CLICKED ALBUM
// ======================================================

function displayAlbum(index) {
  document.getElementById("showCD").innerHTML =
    "Artist: " +
    albumCollection[index].getElementsByTagName("ARTIST")[0].childNodes[0]
      .nodeValue +
    "<br><br>" +
    "Title: " +
    albumCollection[index].getElementsByTagName("TITLE")[0].childNodes[0]
      .nodeValue +
    "<br><br>" +
    "Year: " +
    albumCollection[index].getElementsByTagName("YEAR")[0].childNodes[0]
      .nodeValue;
}

// ======================================================
// COMMON XML DOM METHODS
// ======================================================

/*
getElementsByTagName()      //   Returns elements with a specific tag name
getAttribute()              //   Returns an attribute value
setAttribute()              //   Creates or changes an attribute
appendChild()               //   Adds a new child node
removeChild()               //   Removes a child node
replaceChild()              //   Replaces a child node
cloneNode()                 //   Creates a copy of a node
hasChildNodes()             //   Checks whether a node has children
*/
xmlDoc.getElementsByTagName("CD");
element.getAttribute("id");
element.setAttribute("id", "100");
parent.appendChild(child);
parent.removeChild(child);
parent.replaceChild(newNode, oldNode);
node.cloneNode(true);
node.hasChildNodes();

// ======================================================
// COMMON XML DOM PROPERTIES
// ======================================================

/*
nodeName    // Returns node name
nodeValue   // Returns node value
childNodes  // Returns child nodes
parentNode  // Returns parent node
firstChild  // Returns first child node
lastChild   // Returns last child node
attributes  // Returns attributes collection
textContent // Returns text inside node
*/

// ======================================================
// XML DOM EXAMPLE
// ======================================================
const artist = xmlDoc.getElementsByTagName("ARTIST")[0].childNodes[0].nodeValue;
console.log(artist);

// ======================================================
// AJAX + XML WORKFLOW
// ======================================================

/*
1. Create XMLHttpRequest
2. Open XML file
3. Send request
4. Receive XML response
5. Access responseXML
6. Extract XML nodes
7. Display data in HTML
*/

// ======================================================
// COMPLETE AJAX FLOW
// ======================================================

/*
User Action
     ↓
JavaScript
     ↓
XMLHttpRequest
     ↓
Server
     ↓
Database / XML / PHP
     ↓
Response
     ↓
responseText or responseXML
     ↓
DOM Update
     ↓
Updated Web Page
*/

// ======================================================
// AJAX METHODS QUICK REFERENCE
// ======================================================

/*
open()
send()
abort()
setRequestHeader()
getResponseHeader()
getAllResponseHeaders()
*/

// ======================================================
// AJAX PROPERTIES QUICK REFERENCE
// ======================================================

/*
onload
onreadystatechange
readyState
status
statusText
responseText
responseXML
*/

// ======================================================
// READY STATE VALUES
// ======================================================

/*
0 = Request not initialized
1 = Server connection established
2 = Request received
3 = Processing request
4 = Request completed
*/

// ======================================================
// COMMON HTTP STATUS CODES
// ======================================================

/*
200 = OK
201 = Created
204 = No Content
301 = Moved Permanently
302 = Found
400 = Bad Request
401 = Unauthorized
403 = Forbidden
404 = Not Found
500 = Internal Server Error
*/
