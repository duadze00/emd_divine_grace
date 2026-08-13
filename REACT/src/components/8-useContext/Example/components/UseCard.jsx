import { useContext } from "react";
import MyContext from "../context/MyContext";

function UserCard() {
  //* STEP THREE: CONSUMING THE CONTEXT
  const user = useContext(MyContext);
  return (
    <>
      <h1>Name: {user.name}</h1>
      <h1>Age: {user.age}</h1>
    </>
  );
}

export default UserCard;
