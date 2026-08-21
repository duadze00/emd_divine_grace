import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

//* NB: React Router hooks such as useNavigate() must be used inside a <BrowserRouter>.

// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import { BrowserRouter } from "react-router-dom";
// import App from "./App.jsx";

// createRoot(document.getElementById("root")).render(
//   <StrictMode>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </StrictMode>,
// );

//          <BrowserRouter>
//                │
//                │  Provides Router Context
//                ▼
//             <App />
//                │
//                ▼
//          <ReactRouter />
//                │
//     ┌──────────┴──────────┐
//     │                     │
//     ▼                     ▼
//  Navbar                <Routes>
//                           │
//       ┌───────────────────┼──────────────────┐
//       │                   │                  │
//       ▼                   ▼                  ▼
//      "/"              "/about"          "/dashboard"
//       │                   │                  │
//       ▼                   ▼                  ▼
//     Home                About            Dashboard
//       │                                      │
//       ▼                                      ▼
//     Login                                  <Outlet />
//                                              │
//                                      ┌───────┴───────┐
//                                      ▼               ▼
//                                   Settings        UserInfo
