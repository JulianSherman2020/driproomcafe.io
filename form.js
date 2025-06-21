/**
 * @file form.js
 * @description
 * This script contains the CoffeeCardSignup class which manages the membership signup form
 * for The Drip Room Coffee Card. It handles validation using JustValidate, animations via anime.js,
 * and celebratory confetti using canvas-confetti. On successful submission, it shows a success message,
 * animates UI elements, and redirects the user to a thank-you page.
 *
 * No parent classes.
 */

/**
 * Class to handle Coffee Card signup form validation, animation, and submission.
 */
class CoffeeCardSignup {
  /**
   * Creates an instance of CoffeeCardSignup.
   * @param {string} formSelector - CSS selector of the form to validate.
   */
  constructor(formSelector) {
    /**
     * The form element being validated.
     * @type {HTMLFormElement}
     * @private
     */
    this.form = document.querySelector(formSelector);

    /**
     * The JustValidate validator instance for the form.
     * @type {JustValidate}
     * @private
     */
    this.validator = new JustValidate(formSelector, {
      errorLabelStyle: {
        display: "block",
      },
      errorLabelCssClass: "alert alert-danger py-2 px-3 mt-1 mb-2",
      errorContainer: (field) => {
        return field.input.closest(".mb-3")?.querySelector(".js-error-message");
      },
    });

    /**
     * The DOM element to display success messages.
     * @type {HTMLElement}
     * @private
     */
    this.successMsg = document.getElementById("form-success-msg");

    this._setupValidation();
  }

  /**
   * Sets up validation rules for each form field using JustValidate.
   * Includes required fields, password complexity, and matching passwords.
   * @private
   */
  _setupValidation() {
    this.validator
      .addField("#fName", [
        {
          rule: "required",
          errorMessage:
            "first name is required, please ensure to insert your first name",
        },
        { rule: "minLength", value: 3 },
        { rule: "maxLength", value: 15 },
      ])
      .addField("#lName", [
        {
          rule: "required",
          errorMessage:
            "last name is required, please ensure to insert your last name",
        },
      ])
      .addField("#email", [
        {
          rule: "required",
          errorMessage:
            "a valid email address is required for verification and password resets, please ensure to insert your email address. Ensure you include the @symbol!!!!",
        },
        {
          rule: "email",
          errorMessage: "That doesn’t look like a real email address!",
        },
      ])
      .addField("#dob", [
        {
          rule: "required",
          errorMessage: "Please enter your date of birth",
        },
      ])
      .addField("#create-pwd", [
        {
          rule: "required",
          errorMessage:
            "Password must include uppercase, lowercase, number, symbol, 8–30 chars.",
        },
        { rule: "password" },
      ])
      .addField("#confirm-pwd", [
        {
          rule: "required",
          errorMessage: "please ensure your password matches!",
        },
        {
          validator: (value, fields) =>
            value === fields["#create-pwd"].elem.value,
          errorMessage: "Passwords do not match!",
        },
      ])
      .addField("#membership", [
        {
          rule: "required",
          errorMessage: "Please ensure to select a membership option",
        },
      ])
      .onSuccess((event) => this._handleSuccess(event));
  }

  /**
   * Handles the form submission after successful validation.
   * Prevents default submission, shows a success message, triggers animations,
   * launches confetti, and redirects after a delay.
   *
   * @param {Event} event - The form submission event.
   * @private
   */
  _handleSuccess(event) {
    event.preventDefault();

    this.successMsg.classList.remove("d-none");

    anime({
      targets: "#form-success-msg",
      opacity: [0, 1],
      translateY: [-20, 0],
      duration: 600,
      easing: "easeOutExpo",
    });

    anime({
      targets: this.form,
      opacity: 0.5,
      duration: 600,
      easing: "easeOutQuad",
    });

    this._launchConfetti();

    setTimeout(() => {
      window.location.href = "thankyou.html";
    }, 3000);
  }

  /**
   * Launches confetti animations from two different horizontal positions.
   * Provides instant visual feedback upon successful form submission.
   *
   * @private
   */
  _launchConfetti() {
    confetti({
      particleCount: 50,
      origin: { x: Math.random() * 0.2 + 0.1, y: Math.random() - 0.2 },
    });
    confetti({
      particleCount: 50,
      origin: { x: Math.random() * 0.2 + 0.7, y: Math.random() - 0.2 },
    });
  }
}

// Initialize form validation and handling once the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new CoffeeCardSignup("#signupForm");
});
