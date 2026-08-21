import { useState } from "react";

const Form = ({ user, inputHandler, submitHandler }) => {
  return (
    <form onSubmit={submitHandler}>
      <div>
        <label htmlFor="userName">Name: </label>
        <input
          type="text"
          name="userName"
          id="userName"
          value={user.userName}
          onChange={inputHandler}
        />
      </div>

      <div>
        <label htmlFor="userEmail">Email: </label>
        <input
          type="email"
          name="userEmail"
          id="userEmail"
          value={user.userEmail}
          onChange={inputHandler}
        />
      </div>

      <div>
        <label htmlFor="userPassword">Password: </label>
        <input
          type="password"
          name="userPassword"
          id="userPassword"
          value={user.userPassword}
          onChange={inputHandler}
        />
      </div>

      <div>
        <label htmlFor="userConfirmPassword">Confirm Password:</label>
        <input
          type="password"
          name="userConfirmPassword"
          id="userConfirmPassword"
          value={user.userConfirmPassword}
          onChange={inputHandler}
        />
      </div>

      <button type="submit">Create Account</button>
    </form>
  );
};

function App() {
  const [user, setUser] = useState({
    userName: "",
    userEmail: "",
    userPassword: "",
    userConfirmPassword: "",
  });

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(user);
  };

  return (
    <Form
      user={user}
      inputHandler={inputHandler}
      submitHandler={submitHandler}
    />
  );
}

export default App;
