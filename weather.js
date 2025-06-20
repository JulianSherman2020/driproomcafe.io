// weather.js

// Class to handle weather-based coffee suggestions
class WeatherSuggestionWidget {
  constructor(config) {
    this.apiURL = `${config.weatherApiURL}?q=${config.location}&appid=${config.weatherApiKey}&units=${config.units}`;
    this.targetBox = document.getElementById("weather-suggestion");
  }

  // Fetch weather data from API and render suggestion
  init() {
    if (!this.targetBox) return;

    fetch(this.apiURL)
      .then((res) => res.json())
      .then((data) => {
        const temp = data.main.temp;
        const condition = data.weather[0].main;

        const flavor = this.getFlavorSuggestion(temp, condition);
        this.renderSuggestion(temp, condition, flavor);
        this.animateIn();
      })
      .catch((err) => {
        console.error("Weather API error:", err);
        this.targetBox.innerHTML = `<p>Weather data unavailable — but coffee is always in season ☕</p>`;
      });
  }

  // Suggest a coffee flavor based on temperature and weather
  getFlavorSuggestion(temp, condition) {
    if (temp < 10) return "Caramel Apple Custard Delight 🍎";
    if (condition === "Rain") return "Hot Cocoa Hazelnut Swirl 🌧️";
    if (condition === "Clear" && temp > 25)
      return "Iced Vanilla Latte Chill 🧊";
    if (condition === "Clouds") return "Choco-Mocha Midnight ☁️";
    return "The Signature Brew ☕";
  }

  // Update the DOM with the weather info and suggested coffee
  renderSuggestion(temp, condition, flavor) {
    this.targetBox.innerHTML = `
      <h4 class="fs-4 mb-2">🌤️ Weather-Based Brew Pick</h4>
      <p>It’s <strong>${temp}°C</strong> and <strong>${condition}</strong> in Moorabbin.</p>
      <p>Your match: <strong>${flavor}</strong></p>
    `;
  }

  // Animate the widget using anime.js if available
  animateIn() {
    if (typeof anime !== "undefined") {
      anime({
        targets: "#weather-suggestion",
        opacity: [0, 1],
        translateY: [-20, 0],
        duration: 800,
        easing: "easeOutQuad",
      });
    }
  }
}

// Wait for the page to load before starting widget
document.addEventListener("DOMContentLoaded", () => {
  // Ensure CONFIG is available globally
  if (typeof CONFIG !== "undefined") {
    const weatherWidget = new WeatherSuggestionWidget(CONFIG);
    weatherWidget.init();
  }
});
