require("dotenv").config({ path: "./.env" });
/**
 * CineSearch Engine Core Script
 * Incorporating: Fetching, Grid Injection, Spinner Management, Formats, and Modal Data bindings.
 */

// --- CONFIGURATIONS ---
// To test with actual data, sign up on themoviedb.org, get a key, and insert it here:
const API_KEY = process.env.API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

// State management variables
let currentPage = 1;
let currentQuery = "";
let isSearchMode = false;

// --- DOM ELEMENTS ---
const movieGrid = document.getElementById("movie-grid");
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const spinner = document.getElementById("loading-spinner");
const paginationContainer = document.getElementById("pagination");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const pageNumSpan = document.getElementById("page-num");
const messageContainer = document.getElementById("message-container");
const movieModal = document.getElementById("movie-modal");
const modalBody = document.getElementById("modal-body");
const closeModalBtn = document.getElementById("close-modal-btn");

// --- 1. CORE API FETCHER WITH SPINNER TOGGLE ---
async function fetchMovies(url) {
  // Show loading spinner while loading data
  showSpinner(true);
  clearMessages();

  try {
    // If you don't have an API key configured, use fallbacks gracefully
    if (API_KEY === "YOUR_TMDB_API_KEY_HERE") {
      showSpinner(false);
      loadMockData();
      return;
    }

    const response = await fetch(url);
    if (!response.ok)
      throw new Error("Network issues encountered fetching data.");

    const data = await response.json();
    showSpinner(false);

    if (data.results && data.results.length > 0) {
      displayMovies(data.results);
      setupPaginationDisplay(data.page, data.total_pages);
    } else {
      movieGrid.innerHTML = "";
      paginationContainer.classList.add("hidden");
      messageContainer.textContent = "No movies found matching your request.";
    }
  } catch (error) {
    showSpinner(false);
    messageContainer.textContent = `Error: ${error.message}. Showing mock demo database instead.`;
    loadMockData(); // Safety fallback to demo application if API is offline/not set up
  }
}

// Helper to flip visibility of standard loading element
function showSpinner(show) {
  if (show) {
    spinner.style.display = "flex";
    movieGrid.classList.add("hidden");
  } else {
    spinner.style.display = "none";
    movieGrid.classList.remove("hidden");
  }
}

function clearMessages() {
  messageContainer.textContent = "";
}

// --- 2. MOVIE DATA RENDER ENGINE ---
function displayMovies(movies) {
  movieGrid.innerHTML = ""; // Clear prior elements

  movies.forEach((movie) => {
    // Fallback placeholder poster handling
    const posterPath = movie.poster_path
      ? `${IMAGE_URL}${movie.poster_path}`
      : "https://via.placeholder.com/500x750?text=No+Poster+Available";

    // Extract release year safely
    const releaseYear = movie.release_date
      ? movie.release_date.split("-")[0]
      : "N/A";

    // Determine vote accent boundary color classes
    const ratingClass = getRatingClass(movie.vote_average);

    // Build grid structure template
    const movieCard = document.createElement("div");
    movieCard.classList.add("movie-card");
    movieCard.innerHTML = `
            <img class="movie-poster" src="${posterPath}" alt="${movie.title}" loading="lazy">
            <div class="movie-info">
                <h3 class="movie-title">${movie.title}</h3>
                <div class="movie-meta">
                    <span class="movie-year">${releaseYear}</span>
                    <span class="movie-rating ${ratingClass}">${movie.vote_average.toFixed(1)}</span>
                </div>
            </div>
        `;

    // Interactive callback assigning detailed target focus to Modal popup opening
    movieCard.addEventListener("click", () => openMovieModal(movie));

    movieGrid.appendChild(movieCard);
  });
}

// Rating classification mapping utility
function getRatingClass(vote) {
  if (vote >= 7) return "rating-green";
  if (vote >= 5) return "rating-orange";
  return "rating-red";
}

// --- 3. PAGINATION ENGINE CONTROLS ---
function setupPaginationDisplay(page, totalPages) {
  currentPage = page;
  pageNumSpan.textContent = `Page ${page} of ${totalPages}`;
  paginationContainer.classList.remove("hidden");

  // Disable boundaries respectively
  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages;
}

// Setup URL parameters dynamically for discovery paths vs query searching paths
function loadCurrentPageData() {
  if (isSearchMode) {
    fetchMovies(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(currentQuery)}&page=${currentPage}`,
    );
  } else {
    fetchMovies(
      `${BASE_URL}/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}&page=${currentPage}`,
    );
  }
}

// Pagination Event listeners
prevBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    loadCurrentPageData();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
});

nextBtn.addEventListener("click", () => {
  currentPage++;
  loadCurrentPageData();
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// --- 4. MODAL DETAILED DISPLAY HANDLERS ---
function openMovieModal(movie) {
  const posterPath = movie.poster_path
    ? `${IMAGE_URL}${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Poster+Available";
  const releaseYear = movie.release_date
    ? movie.release_date.split("-")[0]
    : "N/A";

  modalBody.innerHTML = `
        <div class="modal-detail-flex">
            <img class="modal-poster" src="${posterPath}" alt="${movie.title}">
            <div class="modal-info-pane">
                <h2>${movie.title}</h2>
                <p style="color: #38bdf8; font-weight: bold; margin-bottom: 0.5rem;">Year: ${releaseYear} | Rating: ★ ${movie.vote_average.toFixed(1)}</p>
                <p class="modal-overview"><strong>Overview:</strong><br>${movie.overview || "No description available for this title."}</p>
                <p style="font-size: 0.85rem; color: #64748b;">Popularity Score: ${movie.popularity.toFixed(0)}</p>
            </div>
        </div>
    `;

  movieModal.classList.remove("hidden");
  document.body.style.overflow = "hidden"; // Stop background scrolling
}

function closeMovieModal() {
  movieModal.classList.add("hidden");
  document.body.style.overflow = ""; // Restore structural scroll tracking
}

// Close listeners matching standard clean actions
closeModalBtn.addEventListener("click", closeMovieModal);
movieModal.addEventListener("click", (e) => {
  if (e.target === movieModal) closeMovieModal(); // Dismiss if clicked background area outside modal card
});

// --- 5. INTERACTIVE FORM ELEMENT HANDLERS ---
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const query = searchInput.value.trim();

  if (query) {
    currentQuery = query;
    isSearchMode = true;
    currentPage = 1;
    loadCurrentPageData();
  }
});

// --- 6. INITIAL RUN WITH REPLICA MOCK MIGRATION IF USER HAS NO TOKENS ---
function init() {
  loadCurrentPageData();
}

// Auto running execution hook
init();

// Mock static demo context data array just in case you haven't created your TMDB api developer account profile setup yet!
function loadMockData() {
  const mockMovies = [
    {
      title: "Interstellar Horizon",
      vote_average: 8.6,
      release_date: "2014-11-07",
      poster_path: null,
      overview:
        "A team of explorers travel beyond this galaxy to discover whether mankind has a future among the stars.",
      popularity: 450,
    },
    {
      title: "Cyberpunk 2099",
      vote_average: 6.4,
      release_date: "2023-05-12",
      poster_path: null,
      overview:
        "In a neo-dystopian future metropolis, a hacker discovers a digital conspiracy reaching to the highest skyscrapers.",
      popularity: 200,
    },
    {
      title: "The Rogue Chef",
      vote_average: 4.8,
      release_date: "2021-08-19",
      poster_path: null,
      overview:
        "A culinary master loses his patience and starts breaking rules out of the kitchen.",
      popularity: 95,
    },
    {
      title: "Chronicles of Time",
      vote_average: 7.2,
      release_date: "2019-02-14",
      poster_path: null,
      overview:
        "Time traveling archeologists accidentally alter ancient history and must track down artifacts to restore normality.",
      popularity: 310,
    },
  ];
  displayMovies(mockMovies);
  setupPaginationDisplay(1, 1);
}
