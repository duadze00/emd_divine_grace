import { useEffect, useReducer } from "react";

// COMPONENTS
import Form from "./practice/Form";
import TodoItems from "./practice/TodoItems";

const initialState = {
  todos: JSON.parse(localStorage.getItem("todos")) || [],
};

function reducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM":
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: crypto.randomUUID(),
            completed: false,
            item: action.payload.item,
          },
        ],
      };
    case "REMOVE_ITEM":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };

    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addTodoHandler = (todoItem) => {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        item: todoItem,
      },
    });
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(state.todos));
  }, [state.todos]);

  return (
    <>
      <Form addTodoHandler={addTodoHandler} />

      <TodoItems todos={state.todos} dispatch={dispatch} />
    </>
  );
}

export default App;
