require("dotenv").config({ path: "./.env" });

// DOM Elements
const searchBtn = document.getElementById("enter-btn");
const movieNameEl = document.getElementById("movie-name");
const invalidInput = document.getElementById("invalid-input");
const moviesContainer = document.getElementById("movies");
const errorContainer = document.getElementById("error-container");
const errorMessage = document.getElementById("error-message");

// API Key
const API_KEY = process.env.API_KEY;

// Eventlistener
searchBtn.addEventListener("click", () => {
  getMovies();
});

movieNameEl.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    getMovies();
  }
});

// Functions
async function getMovies() {
  const movieName = movieNameEl.value.trim();
  if (!movieName) {
    invalidInput.style.display = "block";
    setTimeout(() => {
      invalidInput.style.display = "none";
    }, 5000);
    return;
  }
  try {
    const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(movieName)}&api_key=${API_KEY}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Server Error");
    }

    const data = await response.json();

    updateUI(data);
  } catch (error) {
    errorContainer.style.display = "block";
    errorMessage.textContent = error.message;

    setTimeout(() => {
      errorContainer.style.display = "none";
    }, 5000);
  }
  movieNameEl.value = "";
}

function updateUI(data) {
  moviesContainer.innerHTML = "";

  if (data.results.length === 0) {
    moviesContainer.innerHTML = "<h2>No movies found.</h2>";
    return;
  }

  data.results.forEach((element) => {
    // Movie container
    const movie = document.createElement("div");
    movie.className = "movie-container";
    movie.dataset.id = element.id;

    // Movie title
    const movieTitle = document.createElement("h4");
    movieTitle.className = "movie-header";
    movieTitle.textContent = element.title;

    // Movie thumbnail
    const movieThumbnail = document.createElement("img");
    movieThumbnail.className = "thumbnail";
    movieThumbnail.src = element.poster_path
      ? `https://image.tmdb.org/t/p/w500${element.poster_path}`
      : "no-image.png";

    // Other info
    const otherInfoContainer = document.createElement("div");
    otherInfoContainer.className = "other-info";

    const releaseDate = document.createElement("h6");
    releaseDate.className = "release-date";
    releaseDate.textContent = element.release_date;

    const overview = document.createElement("p");
    overview.className = "overview";
    overview.textContent = element.overview;

    // Appending other info to it's container
    otherInfoContainer.appendChild(releaseDate);
    otherInfoContainer.appendChild(overview);

    // Appending elements to movie container
    movie.appendChild(movieTitle);
    movie.appendChild(movieThumbnail);
    movie.appendChild(otherInfoContainer);

    // Appending movie to main container in HTML
    moviesContainer.appendChild(movie);
  });
}

// Demo for forEach loop on the return data
const data = { page: 1, result: [1, 2, 3, 4, 5] };

data.result.forEach((element) => {
  console.log(element);
});
