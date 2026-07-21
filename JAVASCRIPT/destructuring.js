const address = { street: "", city: "", country: "" };

// ====================== OLD WAY ======================
const street = address.street;
const city = address.city;
const country = address.country;

// ====================== DESTRUCTURING ======================

// Taking full values
const { street, city, country } = address;

// Omitting some values but taking the interested onces
const { street } = address;

// Using this value instead original value names (Using alias)
const { street: st, city, country: count } = address;


const [first, second] = oldArray;

const { firstName, secondName } = oldObject;