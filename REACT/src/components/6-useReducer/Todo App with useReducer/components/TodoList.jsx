function TodoList(props) {
  const { state, dispatch } = props;
  return (
    <>
      <ul>
        {state.todos.map((todo) => {
          return (
            <li key={todo.id}>
              <strong>{todo.text}</strong>{" "}
              <button
                type="button"
                onClick={() =>
                  dispatch({
                    type: "REMOVE_TODO",
                    payload: todo.id,
                  })
                }
              >
                Remove
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default TodoList;
