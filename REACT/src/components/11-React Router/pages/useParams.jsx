import { useParams } from "react-router-dom";

function Person() {
  const { id } = useParams();

  return (
    <div>
      <h1>Person Page</h1>

      <p>Person ID: {id}</p>
    </div>
  );
}

export default Person;
