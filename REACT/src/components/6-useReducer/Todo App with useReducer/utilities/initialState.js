const initialState = {
  todos: JSON.parse(localStorage.getItem("todos")) || [],
};

export default initialState;
