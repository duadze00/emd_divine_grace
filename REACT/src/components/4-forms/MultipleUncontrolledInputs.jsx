import { useRef } from "react";

function MultipleUncontrolledInputs() {
  const nameRef = useRef();
  const emailRef = useRef();
  const ageRef = useRef();

  function handleSubmit(event) {
    event.preventDefault();

    console.log(nameRef.current.value);
    console.log(emailRef.current.value);
    console.log(ageRef.current.value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input ref={nameRef} type="text" placeholder="Name" />

      <input ref={emailRef} type="email" placeholder="Email" />

      <input ref={ageRef} type="number" placeholder="Age" />

      <button type="submit">Submit</button>
    </form>
  );
}

export default MultipleUncontrolledInputs;
