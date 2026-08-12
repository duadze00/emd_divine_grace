import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  function handleLogin() {
    console.log("User logged in");

    navigate("/dashboard");

    // navigate() can also go backward
    // For example:
    // navigate(-1);
    // means: Go back one page in browser history.
    
    // You can also do: navigate(1);
    // which means: Go forward one page.
    // You can think of:
    // navigate("/about");
  }

  return (
    <div>
      <h1>Login</h1>

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
