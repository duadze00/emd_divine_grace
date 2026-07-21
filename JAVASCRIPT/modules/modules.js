// ============= NAME EXPORT =============
export class Teacher {
  constructor(name, age) {
    this.name = name;
    this.age = age;
    this.subject = "Biochemistry";
  }
  show() {
    return `Hello!. This is sir ${this.name} and he's ${this.age}years old. Your new ${this.subject} teacher`;
  }
}

// ============= DEFAUT EXPORT =============
export default class Student {
  constructor(name, age) {
    this.name = name;
    this.age = age;
    this.university = "Klintaps University College";
  }
  show() {
    return `I'm ${this.name}, ${this.age} years old and a current student of ${this.university}`;
  }
}
