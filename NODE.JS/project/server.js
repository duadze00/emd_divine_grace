const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, "public")));

// API Endpoint
app.get("/api/weather", async (req, res) => {
  const city = req.query.city;
  if (!city) {
    return res.status(400).json({ error: "Please provide a city name." });
  }

  try {
    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;
    const geoRes = await fetch(geoUrl);
    const geoData = await geoRes.json();

    if (!geoData.results || geoData.results.length === 0) {
      return res.status(404).json({ error: `City "${city}" not found.` });
    }

    const { name, country, latitude, longitude } = geoData.results[0];

    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=relativehumidity_2m,apparent_temperature,precipitation_probability`;
    const weatherRes = await fetch(weatherUrl);
    const weatherData = await weatherRes.json();

    const current = weatherData.current_weather;
    const humidity = weatherData.hourly.relativehumidity_2m[0];
    const feelsLike = weatherData.hourly.apparent_temperature[0];

    res.json({
      location: `${name}, ${country}`,
      temperature: Math.round(current.temperature),
      feelsLike: Math.round(feelsLike),
      humidity: humidity,
      windSpeed: Math.round(current.windspeed),
      weatherCode: current.weathercode,
    });
  } catch (err) {
    console.error("API Error:", err);
    res
      .status(500)
      .json({ error: "Failed to fetch weather data. Please try again." });
  }
});

app.listen(PORT, () => {
  console.log(`Weather app running at http://localhost:${PORT}`);
});

// TODO: Run node server.js in the terminal
