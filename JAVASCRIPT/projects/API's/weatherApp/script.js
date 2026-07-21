require("dotenv").config({ path: "./.env" });
// ============================== API KEY ==============================
const apiKey = process.env.API_KEY;

// ============================== HTML DOM ELEMENTS ==============================
const cityInput = document.querySelector("#cityInput");
const searchBtn = document.querySelector("#searchBtn");
const error = document.querySelector("#error");
const weather = document.querySelector("#weather");

const city = document.querySelector("#city");
const icon = document.querySelector("#icon");
const temperature = document.querySelector("#temperature");
const condition = document.querySelector("#condition");
const humidity = document.querySelector("#humidity");
const wind = document.querySelector("#wind");
const feels = document.querySelector("#feels");
const pressure = document.querySelector("#pressure");

// Hide weather when page first loads
weather.style.display = "none";

// ============================== EVENTS ==============================
searchBtn.addEventListener("click", async () => {
  const cityName = cityInput.value.trim();

  // Clear previous error message
  error.textContent = "";

  // Validate input
  if (!cityName) {
    error.textContent = "Please enter a city.";
    weather.style.display = "none";
    return;
  }

  // Get weather data
  const weatherData = await getWeatherData(cityName);

  // If fetch failed
  if (!weatherData) {
    weather.style.display = "none";
    return;
  }

  // Invalid city or API error
  if (weatherData.error) {
    error.textContent = weatherData.error.message;
    weather.style.display = "none";
    return;
  }

  // Display weather information
  displayWeather(weatherData);
});

// ============================== FUNCTIONS ==============================
// Fetch weather data from the API
async function getWeatherData(cityName) {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityName}`,
    );
    if (!response.ok) {
      throw new Error("Unable to retrieve weather data.");
    }

    return await response.json();
  } catch (err) {
    error.textContent = `Something went wrong: ${err.message}`;
    return null;
  }
}

// Display weather on the page
function displayWeather(data) {
  weather.style.display = "block";

  city.textContent = `${data.location.name}, ${data.location.country}`;
  icon.src = `https:${data.current.condition.icon}`;
  icon.alt = data.current.condition.text;
  temperature.textContent = `${data.current.temp_c}°C`;
  condition.textContent = data.current.condition.text;
  humidity.textContent = `${data.current.humidity}%`;
  wind.textContent = `${data.current.wind_kph} km/h`;
  feels.textContent = `${data.current.feelslike_c}°C`;
  pressure.textContent = `${data.current.pressure_mb} hPa`;
}
