//* ==================================================
//* THREE MAIN WAYS TO ACCESS PROPS
//* ==================================================

//* METHOD 1
// Accessing props through the props object.
//
// React passes all props to the component as one object.
// We can access individual values using:
// props.name
// props.age
// props.gender

function AccessPropsThroughObject(props) {
  return (
    <>
      <h1>1. Accessing Props Through the Props Object</h1>
      <h3>Name: {props.name}</h3>
      <h3>Age: {props.age}</h3>
      <h3>Gender: {props.gender}</h3>
    </>
  );
}

//* METHOD 2
// Destructuring props directly in the function parameter.
//
// Instead of receiving the entire props object,
// we immediately extract the properties we need.
//
// props.name  → name
// props.age   → age
// props.gender → gender

function DestructurePropsInParameter({ name, age, gender }) {
  return (
    <>
      <h1>2. Destructuring Props in the Function Parameter</h1>
      <h3>Name: {name}</h3>
      <h3>Age: {age}</h3>
      <h3>Gender: {gender}</h3>
    </>
  );
}

//* METHOD 3
// Destructuring props inside the function body.
//
// First, we receive the complete props object.
// Then we extract the properties we need using
// JavaScript object destructuring.

function DestructurePropsInsideFunction(props) {
  const { name, age, gender } = props;

  return (
    <>
      <h1>3. Destructuring Props Inside the Function</h1>
      <h3>Name: {name}</h3>
      <h3>Age: {age}</h3>
      <h3>Gender: {gender}</h3>
    </>
  );
}

//* ==================================================
//* OTHER USEFUL PROP VARIATIONS
//* ==================================================

//* METHOD 4
// Destructuring only the props that you need.
//
// Even if the parent sends name, age and gender,
// this component only extracts "name".
// The other props are simply ignored.

function DestructureOnlyNeededProps({ name }) {
  return (
    <>
      <h1>4. Destructuring Only the Props You Need</h1>
      <h3>Name: {name}</h3>
    </>
  );
}

//* METHOD 5
// Renaming a prop while destructuring.
//
// "name" is the actual prop received from the parent.
// "studentName" is the local variable we use inside
// the component.
//
// name → studentName

function RenamePropWhileDestructuring({ name: studentName }) {
  return (
    <>
      <h1>5. Renaming a Prop While Destructuring</h1>
      <h3>Name: {studentName}</h3>
    </>
  );
}

//* METHOD 6
// Giving props default values.
//
// If the parent does NOT provide a particular prop,
// the specified default value is used.
//
// Example:
// <Student />
//
// name   → "Unknown Student"
// age    → 0
// gender → "Unknown"
//
// IMPORTANT:
// The default is used when the value is undefined.

function GivePropsDefaultValues({
  name = "Unknown Student",
  age = 0,
  gender = "Unknown",
}) {
  return (
    <>
      <h1>6. Giving Props Default Values</h1>
      <h3>Name: {name}</h3>
      <h3>Age: {age}</h3>
      <h3>Gender: {gender}</h3>
    </>
  );
}

//* METHOD 7
// The children prop.
//
// Anything placed between the opening and closing
// component tags is automatically passed as "children".
//
// Example:
//
// <Card>
//   <h3>Hello</h3>
// </Card>
//
// The <h3> becomes the children prop.

function AccessChildrenProp({ children }) {
  return (
    <>
      <h1>7. Accessing the Children Prop</h1>
      <div>{children}</div>
    </>
  );
}

//* METHOD 8
// Using the rest operator with props.
//
// We extract "name" separately.
// All remaining props are collected into the "rest" object.
//
// Example:
//
// name = "Eric"
// rest = {
//   age: 23,
//   gender: "Male"
// }
//
// JSON.stringify() is used below because "rest" is an object.
// Rendering {rest} directly would produce "[object Object]".

function AccessRemainingPropsWithRest({ name, ...rest }) {
  return (
    <>
      <h1>8. Collecting Remaining Props with ...rest</h1>
      <h3>Name: {name}</h3>
      <h3>Remaining Props:</h3>
      <pre>{JSON.stringify(rest, null, 2)}</pre>
    </>
  );
}

//* ==================================================
//* APP COMPONENT
//* ==================================================

function App() {
  return (
    <>
      {/* METHOD 1
          Passing three props to the component.
          The component receives them through the props object. */}

      <AccessPropsThroughObject
        name="Eric Mawule Duadze"
        age={23}
        gender="Male"
      />

      <hr />

      {/* METHOD 2
          Props are destructured directly in the function parameter. */}

      <DestructurePropsInParameter name="Lucas Graham" age={21} gender="Male" />

      <hr />

      {/* METHOD 3
          The complete props object is received first,
          then destructured inside the function. */}

      <DestructurePropsInsideFunction
        name="Billie Eilish"
        age={24}
        gender="Female"
      />

      <hr />

      {/* METHOD 4
          The component only extracts the "name" prop.
          age and gender are passed but ignored. */}

      <DestructureOnlyNeededProps name="Travis Scott" age={24} gender="Male" />

      <hr />

      {/* METHOD 5
          The "name" prop is renamed to "studentName"
          inside the component. */}

      <RenamePropWhileDestructuring name="Post Malone" age={35} gender="Male" />

      <hr />

      {/* METHOD 6
          No name or age is provided.
          Therefore, the default values are used.

          gender IS provided, so "Male" is used instead
          of the default "Unknown". */}

      <GivePropsDefaultValues gender="Male" />

      <hr />

      {/* METHOD 7
          Everything between <AccessChildrenProp> and
          </AccessChildrenProp> becomes the children prop. */}

      <AccessChildrenProp>
        <h3>I'm the children prop.</h3>
      </AccessChildrenProp>

      <hr />

      {/* METHOD 8
          "name" is extracted separately.
          age and gender are collected inside "rest". */}

      <AccessRemainingPropsWithRest name="Eric" age={23} gender="Male" />
    </>
  );
}

export default App;
