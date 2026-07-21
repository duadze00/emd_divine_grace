const person = { firstName: "Eric", secondName: "Duadze", otherName: "Mawule" };

// Adding new element
person.age = 23;
person.job = { main: "Sonography", sideJob: "Programming" };

// Deleting element
delete person.otherName;

console.log(person);

// Adding to object
const person1 = {
  firstName: "Collins",
  secondName: "Boakye",
  otherName: undefined,
  greet() {
    if (this.otherName === undefined) {
      return `Hello! ${this.firstName} ${this.secondName}`;
    }
    return `Hello! ${this.firstName} ${this.secondName} ${this.otherName}`;
  },
};

const person2 = {
  firstName: "Lucas",
  secondName: "Jesus",
  otherName: "Graham",
};

const person3 = {
  firstName: "Smith",
  secondName: "Jesus",
  otherName: "Capaldi",
};

console.log(person1.greet.bind(person)());
console.log(person1.greet.apply(person2));
console.log(person1.greet.call(person3));
