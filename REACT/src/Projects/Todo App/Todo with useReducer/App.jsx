import { useReducer, useRef, useEffect, useState } from "react";

import NoItemFound from "../../../assets/no-item-found.svg";
import "./style.css";

// =========================================================
// INITIAL STATE
// =========================================================

const initialState = {
  todos: JSON.parse(localStorage.getItem("todos")) || [],
};

// =========================================================
// REDUCER
// =========================================================

const reducer = (state, action) => {
  switch (action.type) {
    // =====================================================
    // ADD TODO
    // =====================================================

    case "ADD_ITEM":
      return {
        ...state,

        todos: [
          ...state.todos,

          {
            text: action.payload,
            id: crypto.randomUUID(),
            completed: false,
          },
        ],
      };

    // =====================================================
    // REMOVE TODO
    // =====================================================

    case "REMOVE_ITEM":
      return {
        ...state,

        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };

    // =====================================================
    // COMPLETE / UNCOMPLETE TODO
    // =====================================================

    case "COMPLETED_ITEM":
      return {
        ...state,

        todos: state.todos.map((todo) =>
          todo.id === action.payload
            ? {
                ...todo,
                completed: !todo.completed,
              }
            : todo,
        ),
      };

    // =====================================================
    // EDIT TODO
    // =====================================================

    case "EDIT_ITEM":
      return {
        ...state,

        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? {
                ...todo,
                text: action.payload.text,
              }
            : todo,
        ),
      };

    // =====================================================
    // DEFAULT
    // =====================================================

    default:
      return state;
  }
};

// =========================================================
// APP COMPONENT
// =========================================================

function App() {
  // =======================================================
  // useReducer
  // =======================================================

  const [state, dispatch] = useReducer(reducer, initialState);

  // =======================================================
  // EDIT MODAL STATE
  //
  // editingTodo:
  // Stores the todo currently being edited.
  //
  // Example:
  //
  // {
  //   id: "abc123",
  //   text: "Learn React",
  //   completed: false
  // }
  //
  // null means the modal is closed.
  // =======================================================

  const [editingTodo, setEditingTodo] = useState(null);

  // =======================================================
  // EDIT INPUT STATE
  // Stores whatever the user is typing inside
  // the edit modal.
  // =======================================================

  const [editText, setEditText] = useState("");

  // =======================================================
  // useRef
  // =======================================================

  const itemRef = useRef(null);

  // =======================================================
  // ADD TODO HANDLER
  // =======================================================

  const addItemHandler = (e) => {
    e.preventDefault();

    const item = itemRef.current.value.trim();

    if (!item) {
      alert("Item must be provided.");
      return;
    }

    dispatch({
      type: "ADD_ITEM",
      payload: item,
    });

    itemRef.current.value = "";
  };

  // =======================================================
  // OPEN EDIT MODAL
  // This runs when the user clicks the Edit button.
  // =======================================================

  const openEditModal = (todo) => {
    // Store the todo we want to edit
    setEditingTodo(todo);

    // Put the current todo text inside the input
    setEditText(todo.text);
  };

  // =======================================================
  // EDIT TODO HANDLER
  // This runs when the user clicks "Save Changes".
  // =======================================================

  const editItemHandler = (e) => {
    e.preventDefault();

    // Remove unnecessary spaces
    const trimmedText = editText.trim();

    // Prevent empty todo
    if (!trimmedText) {
      alert("Todo cannot be empty.");
      return;
    }

    // Send the edited todo to the reducer
    dispatch({
      type: "EDIT_ITEM",
      payload: {
        id: editingTodo.id,
        text: trimmedText,
      },
    });

    // Close the modal
    setEditingTodo(null);

    // Clear the edit input
    setEditText("");
  };

  // =======================================================
  // SAVE TODOS TO LOCAL STORAGE
  // =======================================================

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(state.todos));
  }, [state.todos]);

  // =======================================================
  // JSX
  // =======================================================

  return (
    <>
      {/* ==================================================
          APP TITLE
          ================================================== */}

      <h1>Todo Manager</h1>

      {/* ==================================================
          ADD TODO FORM
          ================================================== */}

      <div>
        <form onSubmit={addItemHandler}>
          <input ref={itemRef} placeholder="Add item here ..." />

          <button type="submit">Add Item</button>
        </form>
      </div>

      {/* ==================================================
          TODO LIST CONTAINER
          ================================================== */}

      <div className="item_container">
        {/* =================================================
            EMPTY STATE
            If there are no todos, show the NoItemFound image.
            ================================================= */}

        {state.todos.length === 0 ? (
          <img src={NoItemFound} alt="No items found" />
        ) : (
          /* =================================================
             TODO LIST
             ================================================= */

          <ul>
            {state.todos.map((todo) => (
              <li key={todo.id}>
                {/* ==========================================
                    TODO TEXT
                    ========================================== */}

                <span className={todo.completed ? "completed" : "uncompleted"}>
                  {todo.text}
                </span>

                {/* ==========================================
                    TODO BUTTONS
                    ========================================== */}

                <div className="btn_container">
                  {/* ========================================
                      EDIT BUTTON
                      opens our custom edit modal.
                      ======================================== */}

                  <button type="button" onClick={() => openEditModal(todo)}>
                    Edit
                  </button>

                  {/* ========================================
                      COMPLETE / UNCOMPLETE BUTTON
                      ======================================== */}

                  <button
                    type="button"
                    onClick={() =>
                      dispatch({
                        type: "COMPLETED_ITEM",
                        payload: todo.id,
                      })
                    }
                  >
                    {todo.completed ? "Uncompleted" : "Completed"}
                  </button>

                  {/* ========================================
                      REMOVE BUTTON
                      ======================================== */}

                  <button
                    type="button"
                    onClick={() =>
                      dispatch({
                        type: "REMOVE_ITEM",
                        payload: todo.id,
                      })
                    }
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* ==================================================
           EDIT MODAL
          editingTodo === null → Modal does NOT exist
          editingTodo !== null → Modal appears
          ================================================== */}

      {editingTodo && (
        <div
          className="modal_overlay"
          // Clicking outside the modal closes it
          onClick={() => {
            setEditingTodo(null);
            setEditText("");
          }}
        >
          {/* =================================================
              MODAL CONTENT
              stopPropagation prevents clicking inside the
              modal from triggering the overlay's onClick.
              ================================================= */}

          <div className="edit_modal" onClick={(e) => e.stopPropagation()}>
            {/* ==============================================
                MODAL TITLE
                ============================================== */}

            <h2>Edit Todo</h2>

            {/* ==============================================
                EDIT FORM
                ============================================== */}

            <form onSubmit={editItemHandler}>
              {/* ============================================
                  EDIT INPUT
                  value: Gets the current edit text.
                  onChange: Updates editText whenever the user types.
                  ============================================ */}

              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                autoFocus
              />

              {/* ============================================
                  MODAL BUTTONS
                  ============================================ */}

              <div className="modal_buttons">
                {/* ==========================================
                    CANCEL BUTTON
                    Does NOT dispatch anything.
                    It simply closes the modal.
                    ========================================== */}

                <button
                  type="button"
                  className="cancel_button"
                  onClick={() => {
                    setEditingTodo(null);
                    setEditText("");
                  }}
                >
                  Cancel
                </button>

                {/* ==========================================
                    SAVE CHANGES BUTTON
                    Submitting this form calls: editItemHandler()
                    ========================================== */}

                <button type="submit" className="save_button">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
