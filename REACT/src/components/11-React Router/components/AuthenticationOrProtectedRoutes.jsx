import { Navigate } from "react-router-dom";
// Navigate is another React Router component.
// It performs navigation when rendered.

function ProtectedRoute({ children }) {
  const isLoggedIn = false;

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
    // The replace: means React Router replaces the current history entry rather than adding another one.
    // That's useful for redirects such as authentication.
  }

  return children;
}

export default ProtectedRoute;
