/**
 * CoffeeCardSignup Class
 * Handles validation, animations, and submission logic for the Coffee Card membership sign-up form.
 * Utilizes JustValidate for form validation, Anime.js for animations, and canvas-confetti for celebration.
 */
class CoffeeCardSignup {
  /**
   * Create an instance of CoffeeCardSignup
   * @param {string} formSelector - CSS selector for the target form element
   */
  constructor(formSelector) {
    // Select the form element based on the provided selector
    this.form = document.querySelector(formSelector);
    // Initialize JustValidate on this form
    this.validator = new JustValidate(formSelector);
    // Cache reference to the success message container
    this.successMsg = document.getElementById("form-success-msg");

    // Setup validation rules and event handling
    this._setupValidation();
  }

  /**
   * Setup form validation rules using JustValidate library
   * Includes rules for required fields, email format, password complexity, and matching passwords
   * @private
   */
  _setupValidation() {
    this.validator
      .addField("#fName", [
        { rule: "required" }, // First name is required
        { rule: "minLength", value: 3 }, // Minimum 3 characters
        { rule: "maxLength", value: 15 }, // Maximum 15 characters
      ])
      .addField("#lName", [{ rule: "required" }]) // Last name required
      .addField("#email", [{ rule: "required" }, { rule: "email" }]) // Email required + valid format
      .addField("#dob", [{ rule: "required" }]) // DOB required
      .addField("#create-pwd", [
        { rule: "required" }, // Password required
        {
          rule: "password", // Must match complexity requirements
          errorMessage:
            "Password must include uppercase, lowercase, number, symbol, 8–30 chars.",
        },
      ])
      .addField("#confirm-pwd", [
        { rule: "required" }, // Confirm password required
        {
          // Custom validator to check passwords match
          validator: (value, fields) =>
            value === fields["#create-pwd"].elem.value,
          errorMessage: "Passwords do not match!",
        },
      ])
      .addField("#membership", [
        {
          rule: "required", // Membership selection required
          errorMessage: "Please select a membership option",
        },
      ])
      // Attach success handler method, bound to this instance
      .onSuccess((event) => this._handleSuccess(event));
  }

  /**
   * Handles successful form submission event
   * Shows success message, animates form and message, launches confetti, and redirects after delay
   * @param {Event} event - The form submission event
   * @private
   */
  _handleSuccess(event) {
    // Prevent actual form submission (page reload)
    event.preventDefault();

    // Show the success message container
    this.successMsg.classList.remove("d-none");

    // Animate the success message: fade in + slide up
    anime({
      targets: "#form-success-msg",
      opacity: [0, 1],
      translateY: [-20, 0],
      duration: 600,
      easing: "easeOutExpo",
    });

    // Animate form to fade to 50% opacity to indicate processing
    anime({
      targets: this.form,
      opacity: 0.5,
      duration: 600,
      easing: "easeOutQuad",
    });

    // Launch confetti celebration animation
    this._launchConfetti();

    // Redirect user to thank-you page after 3 seconds delay
    setTimeout(() => {
      window.location.href = "thankyou.html";
    }, 3000);
  }

  /**
   * Launches confetti animations from two different horizontal origins
   * Uses the global 'confetti' function from canvas-confetti library
   * @private
   */
  _launchConfetti() {
    // Left side confetti burst
    confetti({
      particleCount: 50,
      origin: { x: Math.random() * 0.2 + 0.1, y: Math.random() - 0.2 },
    });
    // Right side confetti burst
    confetti({
      particleCount: 50,
      origin: { x: Math.random() * 0.2 + 0.7, y: Math.random() - 0.2 },
    });
  }
}

// Instantiate and run CoffeeCardSignup when DOM content is loaded
document.addEventListener("DOMContentLoaded", () => {
  new CoffeeCardSignup("#signupForm");
});
