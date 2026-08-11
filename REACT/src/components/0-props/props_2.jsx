export default function Props(props) {
  return (
    <>
      <h1>Hello, {props.name}</h1>
      <h2>{props.age}</h2>
      <h2>{props.title}</h2>
      {props.children}
    </>
  );
}

// BEST PRACTICE: Using destructuring
function DestructingProps({ name, age, title, children }) {
  return (
    <>
      <h1>Hello, {name}</h1>
      <h2>{age}</h2>
      <h2>{title}</h2>
      {children}
    </>
  );
}
