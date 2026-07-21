// =================== JSON ===================
// JSON is a format for storing and transporting data.
// JSON is often used when data is sent from a server to a web page.

// What is JSON?
//    JSON stands for JavaScript Object Notation
//    JSON is a lightweight data interchange format
//    JSON is language independent *
//    JSON is "self-describing" and easy to understand

// JSON file as a string
const data = {
  employees: [
    {
      firstName: "John",
      lastName: "Doe",
    },
    {
      firstName: "Anna",
      lastName: "Smith",
    },
    {
      firstName: "Peter",
      lastName: "Jones",
    },
  ],
};
console.log(data.employees);

// JSON file as a string
const json = `{
  "employees": [
    {
      "firstName": "Eric",
      "lastName": "Duadze"
    }
  ]
}`;
console.log(json);

// ========== JSON Data - A Name and a Value ==========
{
  firstName: "John";
}

// ========== JSON Objects ==========
{
  firstName: "John";
  lastName: "Doe";
}

// ========== JSON Arrays ==========
employees: [
  { firstName: "John", lastName: "Doe" },
  { firstName: "Anna", lastName: "Smith" },
  { firstName: "Peter", lastName: "Jones" },
];

// ========== Converting a JSON Text to a JavaScript Object ==========
let text =
  '{ "employees" : [' +
  '{ "firstName":"John" , "lastName":"Doe" },' +
  '{ "firstName":"Anna" , "lastName":"Smith" },' +
  '{ "firstName":"Peter" , "lastName":"Jones" } ]}';

// Using the JavaScript built-in function JSON.parse() to convert the string into a JavaScript object
const obj = JSON.parse(text);
console.log(obj);

// ========== Converting a JavaScript Object to JSON ==========
// Using the JavaScript built-in function JSON.stringify() to convert a JavaScript object into a JSON string
const string = JSON.stringify(obj);
console.log(string);

// ================ STORING AND RETRIEVING DATA ================
// Storing data:
const myObj = { name: "John", age: 31, city: "New York" };
const myJSON = JSON.stringify(myObj);
localStorage.setItem("testJSON", myJSON);

// Retrieving data:
let retrieveText = localStorage.getItem("testJSON");
let retrieveObj = JSON.parse(retrieveText);
console.log(retrieveObj.name);

// ================ JSON OBJECT LITERALS ================
// This is JSON string:
('{"name":"John", "age":30, "car":null}');
// Inside the JSON string there is a JSON object literal:
const objectLiterals = { name: "John", age: 30, car: null };

// ================ JAVASCRIPT OBJECT ================
const javaScriptOject = { name: "John", age: 30, car: "BMW" };

// ================ ACCESSING OBJECT VALUES ================
// You can access object values by using dot (.) notation or bracket ([]) notation
console.log(javaScriptOject.name);
console.log(javaScriptOject.age);
console.log(javaScriptOject["car"]);

// ================ LOOPING AN OBJECT ================
for (const element in javaScriptOject) {
  console.log(javaScriptOject[element]);
}
// For loop, for of loop and forEach can not be used to loop through and object

// ================ JSON ARRAY LITERALS ================
// This is a JSON string:
('["Ford", "BMW", "Fiat"]');
// Inside the JSON string there is a JSON array literal:
["Ford", "BMW", "Fiat"];

// ================ JAVASCRIPT ARRAYS ================
let myArray = ["Ford", "BMW", "Fiat"];

// ================ ACCESSING ARRAY VALUES ================
console.log(myArray[0]);

// ================ ARRAYS IN OBJECTS ================
const arrayInObject = {
  name: "John",
  age: 30,
  cars: ["Ford", "BMW", "Fiat"],
};
// You access array values by index
console.log(arrayInObject.cars[0]);

// ================ LOOPING THROUGH AN ARRAY ================
for (let i in arrayInObject) {
  console.log(arrayInObject[i]);
}

// ================ JSON SERVER ================
// When receiving data from a web server, the data is alway a string.
// Parse the data with JSON.parse(), and the data becomes a JavaScript object.

// ===== Sending Data =====
const sendingData = { name: "John", age: 31, city: "New York" };
window.location = "demo_json.php?x=" + JSON.stringify(sendingData);

// ===== Receiving Data =====
let receivingData = '{ name: "John", age: 31, city: "New York" }';
const receivingDataObj = JSON.parse(receivingData);

// ================ JSON AND XML ================
// JSON Example
{
  employees: [
    { firstName: "John", lastName: "Doe" },
    { firstName: "Anna", lastName: "Smith" },
    { firstName: "Peter", lastName: "Jones" },
  ];
}

// XML Example
<employees>
  <employee>
    <firstName>John</firstName> <lastName>Doe</lastName>
  </employee>
  <employee>
    <firstName>Anna</firstName> <lastName>Smith</lastName>
  </employee>
  <employee>
    <firstName>Peter</firstName> <lastName>Jones</lastName>
  </employee>
</employees>;
