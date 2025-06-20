/**
 * config.js
 * Stores shared configuration and metadata used across the application.
 * Includes API keys, URLs, and reference links to all third-party libraries used.
 */

const CONFIG = {
  // === WEATHER API CONFIGURATION ===
  weatherApiKey: "73049a62bf44c38b03b7c29cd39ad0a7", // Public demo key
  weatherApiURL: "https://api.openweathermap.org/data/2.5/weather",
  location: "Moorabbin,AU",
  units: "metric",

  // === PROJECT METADATA ===
  projectName: "The Drip Room - Cafe Website with Sign up card form",
  developer: "Julian Sherman",
  lastUpdated: "June 2025",

  // === LIBRARIES + APIS USED (Reference Links) ===
  libraries: {
    animeJS: "https://animejs.com/",
    justValidate: "https://just-validate.dev/",
    confettiJS: "https://www.kirilv.com/canvas-confetti/",
    bootstrap: "https://getbootstrap.com/",
    fontAwesome: "https://fontawesome.com/",
    openWeatherAPI: "https://openweathermap.org/current",
  },
};
