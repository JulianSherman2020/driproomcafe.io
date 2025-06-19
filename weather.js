/**
 * weather.js – Fetches local weather and suggests a coffee flavor
 * Author: Julian Sherman
 * Uses: OpenWeatherMap API
 * Depends on: config.js
 */

/**
 * weather.js – Fetches local weather and suggests a coffee flavor
 * Author: Julian Sherman
 * Uses: OpenWeatherMap API
 * Depends on: config.js
 */

document.addEventListener("DOMContentLoaded", () => {
    const suggestionBox = document.getElementById("weather-suggestion");
  
    if (!suggestionBox) return;
  
    fetch(
      `${CONFIG.weatherApiURL}?q=${CONFIG.location}&appid=${CONFIG.weatherApiKey}&units=metric`
    )
      .then((res) => res.json())
      .then((data) => {
        const temp = data.main.temp;
        const condition = data.weather[0].main;
  
        const flavor = suggestCoffeeFlavor(temp, condition);
  
        suggestionBox.innerHTML = `
          <h4 class="fs-5">🌤️ Weather-Based Brew Pick</h4>
          <p class="fs-6>It’s currently <strong>${temp}°C</strong> and <strong>${condition}</strong> in Moorabbin.</p>
          <p class="fs-6Perfect time for: <strong>${flavor}</strong></p>
        `;
      })
      .catch((err) => {
        console.error("Weather API failed:", err);
        suggestionBox.innerHTML = `<p>Weather data unavailable. No worries, coffee is always in season ☕</p>`;
      });
  });
  
  /**
   * Suggests a flavor based on weather
   * @param {number} temp - temperature in °C
   * @param {string} condition - weather condition (e.g. 'Rain', 'Clear')
   * @returns {string} - coffee flavor name
   */
  function suggestCoffeeFlavor(temp, condition) {
    if (temp < 10) return "Caramel Apple Custard Delight 🍎";
    if (condition === "Rain") return "Hot Cocoa Hazelnut Swirl 🌧️";
    if (condition === "Clear" && temp > 25) return "Iced Vanilla Latte Chill 🧊";
    if (condition === "Clouds") return "Choco-Mocha Midnight ☁️";
    return "The Signature Brew ☕";
  }