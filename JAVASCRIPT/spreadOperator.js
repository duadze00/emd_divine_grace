// The spread operator unpacks arrays, objects, or iterable values.
const first = [1, 20, 15];
const second = [19, 20, 18];

// Odd ways
const combined = first.concat(second);

// ============= SPREAD OPERATOR ON ARRAYS =============
// Spread operator
const combined = [...first, ...second];

// Adding new element
const combined = [...first, "Eric", ...second, "Duadze"];

// Copying an array using spread
const clone = [...second];

// ============= SPREAD OPERATOR ON OBJECTS =============
const firstName = { firstName: "John" };
const secondName = { lastName: "Doe" };

const fullName = { ...firstName, ...secondName };

// Adding new element
const fullName = { ...firstName, ...secondName, age: 24 };

// Copying an object using spread
const clone = [...fullName];
