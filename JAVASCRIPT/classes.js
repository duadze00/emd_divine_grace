// ============== CLASSES SYNTAX ==============

// Use the keyword class to create a class.
// Always add a method named constructor():

// Syntax
class ClassName {
  constructor() {
    // Block of code
  }
}

// Example
class Car {
  constructor(name, year) {
    this.name = name;
    this.year = year;
  }
}
// Creates Car class and the class has two initial properties: "name" and "year".

// ============== USING CLASS TO CREATE AN OBJECT(S) ==============
let myCar1 = new Car("Ford", 2014);
let myCar2 = new Car("Audi", 2019);
// These car object are created from the Car class
// NB. Always use the new keyword when creating an object

// ============== CLASS METHODS ==============
// Class methods are created with the same syntax as object methods.
// Use the keyword class to create a class.
// Always add a constructor() method.
// Then add any number of methods.

// Syntax
class ClassName {
  constructor() {
    // Block of code
  }
  method_1() {
    // Block of code
  }
  method_2() {
    // Block of code
  }
  method_3() {
    // Block of code
  }
}

// Example
// Class
class Car {
  // Constructor
  constructor(name, year) {
    this.name = name;
    this.year = year;
  }
  // Method
  age() {
    let date = new Date();
    return date.getFullYear() - this.year;
  }
}
// Object
let myCar = new Car("Ford", 2014);

// ============== PASSING PARAMETER TO CLASS METHODS ==============
class Car {
  constructor(name, year) {
    this.name = name;
    this.year = year;
  }
  age(x) {
    // x is the parameter passed in
    return x - this.year;
  }
  buyCar() {
    console.log(`You just bought ${this.name} this ${this.year}`);
  }
}

let year = new Date().getFullYear();
let myCar = new Car("Ford", 2014);

// ============== CALLING CLASS METHODS ==============
mineCar.age(2028);
mineCar.buyCar();

// ====================================================
// Car blueprint
class Car {
  // Constructor: The constructor runs automatically when creating an object.
  constructor(brand, model) {
    this.brand = brand;
    this.model = model;
  }
  // Method: Functions inside classes are called methods.
  start() {
    console.log(`${this.brand} ${this.model} started`);
  }
}

// Creating Objects from the blueperint(Car)
const car1 = new Car("Toyota", "Corolla");
const car2 = new Car("Honda", "Civic");

car1.start();
car2.start();

class Person {
  constructor(name) {
    this.name = name;
  }
  greet() {
    console.log(`Hello, I am ${this.name}`);
  }
}

const user = new Person("Eric");
user.greet();

// ===================== INHERITANCE =====================
// A class can inherit from another class.
// Animal
//    |
//    |---- Dog
//    |
//    |---- Cat

class Animal {
  speak() {
    console.log("Animal makes sound");
  }
}

// The Dog class is inheriting the from the Animal class
// Use the extends for inheritance
// To create a class inheritance, use the extends keyword.
class Dog extends Animal {
  bark() {
    console.log("Woof!");
  }
}

const dog = new Dog();

dog.speak();
dog.bark();

// ===================== SUPER() =====================
// Used to access parent class constructor.
// The super() method refers to the parent class.
class Animal {
  constructor(name) {
    this.name = name;
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name);

    this.breed = breed;
  }
}

const dog = new Dog("Max", "German Shepherd");
console.log(dog);

// ===================== GETTER AND SETTER =====================
// Classes also allows you to use getters and setters.
// To add getters and setters in the class, use the get and set keywords.

class Car {
  constructor(brand) {
    this.carname = brand;
  }
  get cnam() {
    return this.carname;
  }
  set cnam(x) {
    this.carname = x;
  }
}

let myCar = new Car("Ford");

// ===================== PRIVATE FIELDS =====================
class BankAccount {
  #balance = 0;

  deposit(amount) {
    this.#balance += amount;
  }

  getBalance() {
    return this.#balance;
  }
}

const account = new BankAccount();

account.deposit(100);

console.log(account.getBalance());

// ===================== STATIC METHODS =====================
// Belong to the class itself.
// Static class methods are defined on the class itself.
// You cannot call a static method on an object, only on an object class.
class MathHelper {
  static add(a, b) {
    return a + b;
  }
}
console.log(MathHelper.add(5, 3));

// ===================== ACCESSING SETTER =====================
class School {
  constructor(stage) {
    this._stage = stage;
  }
  register(name) {
    return `Welcome ${name}, a new ${this._stage.toLowerCase()}`;
  }
}

class Student extends School {
  constructor(stage) {
    super(stage);
  }
  // Getter
  get stage() {
    return this._stage;
  }
  // Setter
  set stage(value) {
    this._stage = value;
    return this._stage;
  }
}

const school = new Student("Student");

// Accessing setter and assigning new value
// It's done this way because stage is a setter not a method
school.stage = "Professor";
console.log(school.register("Eric"));

// ===================== NOTE =====================
// stage is the public property (uses the getter/setter)
// _stage is the internal storage that avoids recursion
