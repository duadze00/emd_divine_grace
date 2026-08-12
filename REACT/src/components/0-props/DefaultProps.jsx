function SchoolRegistration({
  name,
  age,
  role = "Student", // Default role is "Student"
  gender = "Unknown", // Default gender is "Unknown"
}) {
  return (
    <>
      <h1>Students List</h1>
      <h3>Name: {name}</h3>
      <h3>Age: {age}</h3>
      <h3>Gender: {gender}</h3>
      <h3>Role: {role}</h3>
    </>
  );
}

export default SchoolRegistration;
