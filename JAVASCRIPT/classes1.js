// Create a class
class ClassName {
  // Class constructor
  constructor(property) {
    this.property = property; // Class body/properties
  }
  // static method
  static methodName() {}
}

// Inheritance
class OtherClassName extends ClassName {
  // Class constructor
  constructor(property, otherProperty) {
    // super calls the parent class (ClassName)
    super(properpy);
    this.otherProperty = otherProperty;
  }
}

objectName = new ClassName("property"); // Create an object of Car class

// Class Methods
// Method	         Description
// constructor()	 A special method for creating and initializing objects created within a class

// Class Keywords
// Keyword	   Description
// extends	   Extends a class (inherit)
// static	     Defines a static method for a class
// super	     Refers to the parent class

// Syntax
super(arguments); // calls the parent constructor (only inside the constructor)
super.parentMethod(arguments); // calls a parent method

class Car {
  constructor(brand) {
    this.carname = brand;
  }
  // static method
  static hello() {
    return "Hello!!";
  }
  present() {
    return "I have a " + this.carname;
  }
}

// Inheritance
class Model extends Car {
  constructor(brand, mod) {
    super(brand);
    this.model = mod;
  }
  show() {
    return this.present() + ", it is a " + this.model;
  }
}

mycar = new Model("Ford", "Mustang");
console.log(mycar.show());

// How to use static method
console.log(Car.hello());
// Not allow. Error
myCar.hello();
