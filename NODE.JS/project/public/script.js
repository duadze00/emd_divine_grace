function getWeatherEmoji(code) {
  if (code === 0) return "☀️";
  if (code >= 1 && code <= 3) return "🌤️";
  if (code >= 45 && code <= 48) return "🌫️";
  if (code >= 51 && code <= 67) return "🌧️";
  if (code >= 71 && code <= 77) return "❄️";
  if (code >= 80 && code <= 82) return "🌦️";
  if (code >= 95) return "🌩️";
  return "🌡️";
}

document.getElementById("cityInput").addEventListener("keypress", function (e) {
  if (e.key === "Enter") getWeather();
});

async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const errorDiv = document.getElementById("errorMsg");
  const infoDiv = document.getElementById("weatherInfo");

  if (!city) return;

  errorDiv.style.display = "none";
  infoDiv.style.display = "none";

  try {
    const response = await fetch(
      "/api/weather?city=" + encodeURIComponent(city),
    );
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Something went wrong");
    }

    document.getElementById("cityName").textContent = data.location;
    document.getElementById("weatherIcon").textContent = getWeatherEmoji(
      data.weatherCode,
    );
    document.getElementById("temp").textContent = data.temperature + "°C";
    document.getElementById("feelsLike").textContent = data.feelsLike + "°C";
    document.getElementById("humidity").textContent = data.humidity + "%";
    document.getElementById("windSpeed").textContent = data.windSpeed + " km/h";

    infoDiv.style.display = "block";
  } catch (err) {
    errorDiv.textContent = err.message;
    errorDiv.style.display = "block";
  }
}
