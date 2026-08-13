import Dashboard from "./components/Dashboard";
import MyContext from "./context/MyContext";

function Example() {
  const user = { name: "Eric", age: 25 };

  return (
    //* STEP TWO: PROVIDE THE DATA
    <>
      <h1>Context API Practice</h1>
      <MyContext.Provider value={user}>
        <Dashboard />
      </MyContext.Provider>
    </>
  );
}

export default Example;

//* +++++++++++++++++++++++++++++++++++++++++++
//* ================== STEPS ==================
//*
//* STEP 1. Is in "../context/MyContext.jsx"
//* STEP 2. Is in here "../Example.jsx"
//* STEP 2. Is in "./components/UseCard.jsx"
//* +++++++++++++++++++++++++++++++++++++++++++
