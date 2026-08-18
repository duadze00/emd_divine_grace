import { useEffect, useReducer, useState } from "react";
import TodoList from "./components/TodoList";
import NoItemFound from "./components/NoItemFound";
import initialState from "./utilities/initialState";
import reducer from "./utilities/reducer";

import "./styples/style.css";

function TodoApp() {
  const [item, setItem] = useState("");
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(state.todos));
  }, [state.todos]);

  const onChangeHandler = (e) => {
    const inputItem = e.target.value;
    setItem(inputItem);
  };

  const addItemHandler = (e) => {
    e.preventDefault();
    if (!item.trim()) return;

    dispatch({
      type: "ADD_TODO",
      payload: item,
    });

    setItem("");
  };

  return (
    <>
      <h1>
        <strong>EMD</strong> Divine Grace Todo Manager
      </h1>

      <div>
        <form onSubmit={addItemHandler}>
          <input
            type="text"
            placeholder="Example ..."
            value={item}
            onChange={onChangeHandler}
          />
          <button type="submit">Add</button>
        </form>
      </div>
      {state.todos.length === 0 ? (
        <NoItem />
      ) : (
        <div>
          <TodoList state={state} dispatch={dispatch} />
          <div>
            <button
              className="clear"
              type="button"
              onClick={() => dispatch({ type: "CLEAR_TODO" })}
            >
              Clear List
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default TodoApp;
