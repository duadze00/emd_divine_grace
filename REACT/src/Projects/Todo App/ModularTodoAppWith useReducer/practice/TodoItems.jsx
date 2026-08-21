import noItemFound from "../assets/no-item-found.svg";

function TodoItems({ todos, dispatch }) {
  return (
    <div>
      {todos.length === 0 ? (
        <div>
          <img src={noItemFound} alt="" />
          <h4>No item found.</h4>
          <h6>Add one above.</h6>
        </div>
      ) : (
        <ul>
          {todos.map((todo) => {
            return (
              <li key={todo.id}>
                <span>{todo.item}</span>
                <div>
                  <button type="button">Edit</button>
                  <button type="button">
                    {todo.completed ? "Uncompleted" : "Completed"}
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      dispatch({
                        type: "REMOVE_ITEM",
                        payload: todo.id,
                      })
                    }
                  >
                    Delete
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default TodoItems;
