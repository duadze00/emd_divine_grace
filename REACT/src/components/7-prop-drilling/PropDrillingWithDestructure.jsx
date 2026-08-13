function Navbar({ name, age, gender = "Unknown" }) {
  return (
    <>
      <UserProfile name={name} age={age} gender={gender} />
    </>
  );
}

function UserProfile({ name, age, gender }) {
  return (
    <>
      <UserCard name={name} age={age} gender={gender} />
    </>
  );
}

function UserCard({ name, age, gender }) {
  return (
    <>
      <h1>Name: {name}</h1>
      <h3>Age: {age}</h3>
      <h3>Gender: {gender}</h3>
    </>
  );
}

function App() {
  const user = {
    age: 23,
    name: "Eric Mawule Duadze",
    gender: "Male",
  };

  return (
    <>
      <Navbar name={user.name} age={user.age} />
    </>
  );
}

export default App;
