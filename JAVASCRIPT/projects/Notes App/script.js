const header = document.getElementById("container");
const searchContainer = document.getElementById("search-container");
const parentContainer = document.getElementById("parent-container");
const inputsContainer = document.getElementById("inputs-container");
const notesContainer = document.getElementById("notes-container");
const searchInput = document.getElementById("search");
const noteTitle = document.getElementById("note-title");
const noteContent = document.getElementById("note");
const addNoteBtn = document.getElementById("add-note");
const backBtn = document.getElementById("back-btn");
const saveBtn = document.getElementById("save-btn");
const backContainer = document.getElementById("back");

const notes = JSON.parse(localStorage.getItem("notes")) || [];

addNoteBtn.addEventListener("click", () => {
  const note = {};
  notes.push(note);
});

function updateUI() {
  notesContainer.innerHTML = "";

  const sortedNotes = [...notes].reverse();

  sortedNotes.forEach((note) => {
    const li = document.createElement("li");
    li.className = "note";
    li.dataset.id = note.id;

    li.innerHTML = `
                    <div class="note-header">
                      <h2 class="note-title">${note.title}</h2>

                      <div class="note-actions">
                        <button class="pin-btn">
                          <i class="fa-solid fa-thumbtack"></i>
                        </button>

                        <button class="edit-btn">
                          <i class="fa-solid fa-pen"></i>
                        </button>

                        <button class="delete-btn">
                          <i class="fa-solid fa-trash"></i>
                        </button>
                      </div>
                    </div>

                    <p class="note-details">${note.details}</p>

                    <div class="note-footer">
                      <span class="created-at">${note.id}</span>
                    </div>
                  `;

    notesContainer.appendChild(li);
  });
}

updateUI();
