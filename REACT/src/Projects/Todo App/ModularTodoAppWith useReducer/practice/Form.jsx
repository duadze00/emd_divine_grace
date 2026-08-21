import { useRef } from "react";

function Form({ addTodoHandler }) {
  const todoItemRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const todoItem = todoItemRef.current.value.trim();
    if (!todoItem) return;
    addTodoHandler(todoItem);
    todoItemRef.current.value = "";
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" ref={todoItemRef} placeholder="Example..." />

      <button type="submit">Add Item</button>
    </form>
  );
}

export default Form;
