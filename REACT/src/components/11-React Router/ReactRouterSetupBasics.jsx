//* +++++++++++++++++++++++++++++++++++++++++++++++++++++++
//* FIRST RUN: npm install react-router-dom
//* +++++++++++++++++++++++++++++++++++++++++++++++++++++++

//* REACT ROUTER
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// BrowserRouter is the component that gives your React application access to the browser's URL.
//* <BrowserRouter> same as <Router>
// <Router>: Router is wrapping the part of your application that needs routing.

// <Routes>: Routes is basically the route manager.
// It looks at the current URL and determines which Route should be rendered.

{
  /* <Route path="/about" element={<About />} />: This is one individual routing rule.
You are basically saying: "When the URL matches /about, render the About component." 

//* The two important properties are:
1. path: specifies which URL should match
2. element: This tells React Router: "What should I render when this path matches?"
*/
}

// The :id is a dynamic route parameter. This means the id isn't fixed.

// The * is basically the catch-all route. It means: "If none of the other routes match, render Error."

//* PAGES
import Home from "./pages/Home";
import About from "./pages/About";
import People from "./pages/People";
import Error from "./pages/Error";
import Person from "./pages/useParams";

//* NAVBAR
import Navbar from "./components/Navbar";

//* MAIN REACT ROUTER SETUP
function ReactRouterSetup() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/people" element={<People />} />
        <Route path="/person/:id" element={<Person />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default ReactRouterSetup;

//* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//* REACT ROUTER STRUCTURE
//* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//*                          Browser
//*                            │
//*                            │ URL
//*                            ↓
//*                      <BrowserRouter>
//*                            │
//*                            ↓
//*                          <Routes>
//*                            │
//*     ┌<Route path = "/URL element = {<Component/>┐
//*     ↓                      ↓                    ↓
//*  /about                  /people             /person/:id
//*     │                      │                    │
//*     ↓                      ↓                    ↓
//*  <About />               <People />           <Person />

//* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//* REACT ROUTER STRUCTURE IN PLAIN ENGLISH
//* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// 1. Start React Router.
// 2. Always show the Navbar.
// 3. Look at the current URL.
// 4. If the URL is /, show Home.
// 5. If the URL is /about, show About.
// 6. If the URL is /people, show People.
// 7. If the URL follows /person/something, show Person and make that something available as a route parameter called id.
// 8. If nothing matches, show Error.
