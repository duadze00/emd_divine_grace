require("dotenv").config({ path: "./.env" });

// ==========================================
// API CONFIGURATION
// ==========================================
const API_KEY = process.env.API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const PLACEHOLDER_IMAGE =
  "https://via.placeholder.com/500x750?text=No+Image+Available";

// ==========================================
// DOM ELEMENTS
// ==========================================
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");

const loading = document.getElementById("loading");
const message = document.getElementById("message");

const moviesContainer = document.getElementById("movies");

const movieModal = document.getElementById("movie-modal");
const modalBody = document.getElementById("modal-body");
const modalClose = document.getElementById("modal-close");

const scrollSentinel = document.getElementById("scroll-sentinel");
const loadMore = document.getElementById("load-more");

// ==========================================
// APPLICATION STATE
// ==========================================
let currentQuery = ""; // Empty string = default popular movies mode
let currentPage = 1;
let totalPages = 1;
let isLoading = false;

// ==========================================
// INTERSECTION OBSERVER SETUP (INFINITE SCROLL)
// ==========================================
const observer = new IntersectionObserver(handleIntersection, {
  root: null,
  rootMargin: "300px",
  threshold: 0,
});

// Start watching the sentinel element
observer.observe(scrollSentinel);

// ==========================================
// INITIALIZATION & EVENT LISTENERS
// ==========================================
document.addEventListener("DOMContentLoaded", initApp);

searchForm.addEventListener("submit", handleSearch);
moviesContainer.addEventListener("click", handleMovieClick);

// Modal listeners
modalClose.addEventListener("click", closeMovieModal);
movieModal.addEventListener("click", (event) => {
  if (event.target === movieModal) {
    closeMovieModal();
  }
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !movieModal.hidden) {
    closeMovieModal();
  }
});

/**
 ** Initializes app on startup: loads default popular movies.
 */
async function initApp() {
  currentQuery = "";
  currentPage = 1;
  await loadMovies();
}

// ==========================================
// SEARCH & DATA FETCHING
// ==========================================

/**
 ** Handles form submission for search.
 */
async function handleSearch(event) {
  event.preventDefault();

  clearMessage();
  const query = searchInput.value.trim();

  currentQuery = query;
  currentPage = 1;
  totalPages = 1;

  clearMovies();
  await loadMovies();
}

/**
 ** Loads movies depending on whether a search query is active or default state.
 */
async function loadMovies() {
  if (isLoading) return;

  try {
    isLoading = true;
    disableSearchButton();

    if (currentPage === 1) {
      showLoading();
    } else {
      showLoadMore();
    }

    const data = await fetchMoviesData(currentQuery, currentPage);

    totalPages = data.total_pages;

    if (data.results.length === 0 && currentPage === 1) {
      showMessage(`No movies found for "${currentQuery}".`, "info");
      return;
    }

    displayMovies(data.results);
  } catch (error) {
    console.error("Movie fetch error:", error);
    showMessage(
      error.message || "Something went wrong. Please try again.",
      "error",
    );
  } finally {
    hideLoading();
    hideLoadMore();
    enableSearchButton();
    isLoading = false;
  }
}

/**
 ** Constructs URL and fetches movies from TMDb (Search vs. Discover Popular).
 */
async function fetchMoviesData(query, page) {
  const endpoint = query
    ? `${BASE_URL}/search/movie?query=${encodeURIComponent(query)}&page=${page}&api_key=${API_KEY}`
    : `${BASE_URL}/discover/movie?sort_by=popularity.desc&page=${page}&api_key=${API_KEY}`;

  const response = await fetch(endpoint);

  if (!response.ok) {
    if (response.status === 401)
      throw new Error("API Key invalid or unauthenticated.");
    if (response.status === 429)
      throw new Error("Too many requests. Please wait.");
    if (response.status >= 500) throw new Error("TMDb server error.");
    throw new Error("Failed to fetch movies.");
  }

  return response.json();
}

// ==========================================
// INFINITE SCROLL LOGIC
// ==========================================

function handleIntersection(entries) {
  const entry = entries[0];

  // Trigger next page when sentinel becomes visible
  if (entry.isIntersecting && !isLoading && currentPage < totalPages) {
    loadNextPage();
  }
}

async function loadNextPage() {
  currentPage++;
  try {
    await loadMovies();
  } catch (error) {
    // Revert page counter if fail so user can retry scroll
    currentPage--;
  }
}

// ==========================================
// DOM RENDERING & CARDS
// ==========================================

function clearMovies() {
  moviesContainer.innerHTML = "";
}

function displayMovies(movies) {
  movies.forEach((movie) => {
    const movieCard = createMovieCard(movie);
    moviesContainer.appendChild(movieCard);
  });
}

function createMovieCard(movie) {
  const movieCard = document.createElement("article");
  movieCard.className = "movie-card";
  movieCard.dataset.id = movie.id;

  const posterSrc = movie.poster_path
    ? `${IMAGE_BASE_URL}${movie.poster_path}`
    : PLACEHOLDER_IMAGE;

  const releaseYear = movie.release_date
    ? movie.release_date.slice(0, 4)
    : "Unknown";

  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "N/A";

  movieCard.innerHTML = `
    <img class="movie-poster" src="${posterSrc}" alt="${movie.title}" loading="lazy">
    <div class="movie-content">
      <h2 class="movie-title">${movie.title}</h2>
      <p class="movie-rating">⭐ ${rating}</p>
      <p class="movie-year">${releaseYear}</p>
      <p class="movie-overview">${movie.overview || "No overview available."}</p>
    </div>
  `;

  return movieCard;
}

// ==========================================
// MOVIE MODAL DETAILS
// ==========================================

function handleMovieClick(event) {
  const movieCard = event.target.closest(".movie-card");
  if (!movieCard) return;

  const movieId = movieCard.dataset.id;
  openMovieModal(movieId);
}

async function fetchMovieDetails(movieId) {
  const url = `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch movie details.");
  }

  return response.json();
}

async function openMovieModal(movieId) {
  movieModal.hidden = false;
  modalBody.innerHTML = `<p class="message info">Loading movie details...</p>`;

  try {
    const movie = await fetchMovieDetails(movieId);
    renderMovieDetails(movie);
  } catch (error) {
    console.error("Movie details error:", error);
    modalBody.innerHTML = `<p class="message error">Unable to load movie details.</p>`;
  }
}

function renderMovieDetails(movie) {
  const posterUrl = movie.poster_path
    ? `${IMAGE_BASE_URL}${movie.poster_path}`
    : PLACEHOLDER_IMAGE;

  const releaseYear = movie.release_date
    ? movie.release_date.slice(0, 4)
    : "Unknown";

  const genres =
    movie.genres && movie.genres.length > 0
      ? movie.genres.map((g) => `<span class="genre">${g.name}</span>`).join("")
      : `<span class="genre">N/A</span>`;

  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "N/A";

  modalBody.innerHTML = `
    <div class="modal-movie">
      <img class="modal-poster" src="${posterUrl}" alt="${movie.title}">
      <div class="modal-details">
        <h2 id="modal-title" class="modal-title">${movie.title}</h2>
        <p class="modal-rating">⭐ ${rating}</p>
        <div class="modal-meta">
          <span>${releaseYear}</span>
          <span>${movie.runtime ? movie.runtime + " minutes" : "Runtime N/A"}</span>
        </div>
        <div class="modal-genres">${genres}</div>
        <p class="modal-overview">${movie.overview || "No overview available."}</p>
      </div>
    </div>`;
}

function closeMovieModal() {
  movieModal.hidden = true;
  modalBody.innerHTML = "";
}

// ==========================================
// UI STATE HELPERS
// ==========================================

function showMessage(text, type = "error") {
  message.textContent = text;
  message.className = `message ${type}`;
}

function clearMessage() {
  message.textContent = "";
  message.className = "";
}

function showLoading() {
  loading.hidden = false;
}

function hideLoading() {
  loading.hidden = true;
}

function showLoadMore() {
  loadMore.hidden = false;
}

function hideLoadMore() {
  loadMore.hidden = true;
}

function disableSearchButton() {
  const btn = searchForm.querySelector("button");
  if (btn) btn.disabled = true;
}

function enableSearchButton() {
  const btn = searchForm.querySelector("button");
  if (btn) btn.disabled = false;
}
