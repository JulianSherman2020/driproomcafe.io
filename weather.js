/**
 * @file weather.js
 * @description
 * This script contains the WeatherSuggestionWidget class which fetches current weather
 * data from the OpenWeatherMap API and displays a coffee flavor suggestion
 * based on temperature and weather conditions. It also animates the UI using anime.js.
 *
 * No parent classes.
 */

/**
 * Class to fetch weather data and suggest coffee flavors accordingly.
 */
class WeatherSuggestionWidget {
  /**
   * Creates a WeatherSuggestionWidget instance.
   *
   * @param {Object} config - Configuration object containing API details.
   * @param {string} config.weatherApiURL - Base URL for the weather API.
   * @param {string} config.location - Location string (e.g., "Moorabbin,AU").
   * @param {string} config.weatherApiKey - API key for weather API.
   * @param {string} config.units - Units for temperature ("metric" or "imperial").
   */
  constructor(config) {
    /**
     * The complete URL used to fetch weather data.
     * @type {string}
     * @private
     */
    this.apiURL = `${config.weatherApiURL}?q=${config.location}&appid=${config.weatherApiKey}&units=${config.units}`;

    /**
     * The DOM element where weather suggestion will be displayed.
     * @type {HTMLElement}
     * @private
     */
    this.targetBox = document.getElementById("weather-suggestion");
  }

  /**
   * Initialize the widget: fetch weather data and update UI accordingly.
   */
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

  /**
   * Suggest a coffee flavor based on temperature and weather condition.
   *
   * @param {number} temp - Current temperature in degrees.
   * @param {string} condition - Weather condition description.
   * @returns {string} - Suggested coffee flavor.
   */
  getFlavorSuggestion(temp, condition) {
    if (temp < 10) return "Caramel Apple Custard Delight 🍎";
    if (condition === "Rain") return "Hot Cocoa Hazelnut Swirl 🌧️";
    if (condition === "Clear" && temp > 25)
      return "Iced Vanilla Latte Chill 🧊";
    if (condition === "Clouds") return "Choco-Mocha Midnight ☁️";
    return "The Signature Brew ☕";
  }

  /**
   * Render the weather and coffee suggestion into the target DOM element.
   *
   * @param {number} temp - Current temperature.
   * @param {string} condition - Current weather condition.
   * @param {string} flavor - Suggested coffee flavor.
   */
  renderSuggestion(temp, condition, flavor) {
    this.targetBox.innerHTML = `
      <h4 class="fs-4 mb-2">🌤️ Weather-Based Brew Pick</h4>
      <p>It’s <strong>${temp}°C</strong> and <strong>${condition}</strong> in Moorabbin.</p>
      <p>Your match: <strong>${flavor}</strong></p>
    `;
  }

  /**
   * Animate the weather suggestion container into view using anime.js.
   */
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

// Initialize the weather widget once DOM is loaded and CONFIG is available
document.addEventListener("DOMContentLoaded", () => {
  if (typeof CONFIG !== "undefined") {
    const widget = new WeatherSuggestionWidget(CONFIG);
    widget.init();
  }
});
