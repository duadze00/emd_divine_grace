// DOM Elements
const bookmarkNameEl = document.getElementById("bookmark-name");
const bookmarkURLEl = document.getElementById("bookmark-url");
const addBookmark = document.getElementById("add-btn");
const bookmarkContainer = document.getElementById("bookmarks-container");
const bookmarkListContainer = document.getElementById("bookmark-list");

// Bookmarks
const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];

// Event listeners
addBookmark.addEventListener("click", addToBookmark);
window.addEventListener("DOMContentLoaded", updateUI);

// Function
function addToBookmark() {
  let bookmarkName = bookmarkNameEl.value.trim();
  let bookmarkURL = bookmarkURLEl.value.trim();

  if (!bookmarkName || !bookmarkURL) {
    alert("Bookmark name and bookmark URL must be provided.");
    return;
  }
  if (
    !bookmarkURL.startsWith("http://") &&
    !bookmarkURL.startsWith("https://")
  ) {
    bookmarkURL = "https://" + bookmarkURL;
  }
  if (!bookmarkURL.endsWith(".com")) {
    bookmarkURL += ".com";
  }

  const bookmark = { bookmarkName, bookmarkURL };
  bookmarks.push(bookmark);
  alert("Bookmark added successfully");

  saveData();
  updateUI();

  // Clear input field
  bookmarkNameEl.value = "";
  bookmarkURLEl.value = "";
}
function updateUI() {
  bookmarkListContainer.innerHTML = "";

  if (bookmarks.length === 0) {
    bookmarkContainer.style.display = "none";
  } else {
    bookmarkContainer.style.display = "block";
  }
  const sortedBookmarks = [...bookmarks].reverse();
  sortedBookmarks.forEach((element, index) => {
    const list = document.createElement("li");
    list.classList.add("bookmark");
    list.dataset.index = index;

    // Link
    const link = document.createElement("a");
    link.classList.add("link");
    link.textContent = element.bookmarkName;
    link.href = element.bookmarkURL;
    link.target = "_blank";
    link.rel = "noopener noreferrer";

    // Remove
    const removeBtn = document.createElement("button");
    removeBtn.classList.add("delete");
    removeBtn.textContent = "Remove";

    // Appending to list
    list.appendChild(link);
    list.appendChild(removeBtn);

    bookmarkListContainer.appendChild(list);
  });
}

bookmarkListContainer.addEventListener("click", function (event) {
  if (event.target.matches(".delete")) {
    deleteBookmark(event);
  }
});

function saveData() {
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}

function deleteBookmark(event) {
  const list = event.target.closest(".bookmark");
  const index = list.dataset.index;
  bookmarks.splice(index, 1);
  saveData();
  updateUI();
  console.log("Deleted Succesfully");
}
