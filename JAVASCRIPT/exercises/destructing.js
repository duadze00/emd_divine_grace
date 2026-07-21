const fruits = ["Mango", "Pineapple", "Cherry", "Kiwi", "Orange", "Pawpaw"];

const [first, , third] = fruits;
console.log(first);

const person = { firstName: "Eric", secondName: "Duadze", otherName: "Mawule" };
const { firstName, otherName } = person;
console.log(otherName);
console.log(firstName);

const person2 = {
  name: "Eric Mawule Duadze",
  job: {
    main: "Songraphy",
    others: {
      one: "Programming",
      two: "Graphic Design",
    },
  },
};

// Nested Destructuring
const { main } = person2.job;
console.log(main);

const { one, two } = person2.job.others;
console.log(one);
console.log(two);
