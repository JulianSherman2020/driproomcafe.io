/**
 * @file form-contact.js
 * @description
 * Manages the Contact Form on the Drip Room website using JustValidate,
 * anime.js for animations, and canvas-confetti for celebrations.
 * Displays a success message, animates UI elements, and redirects.
 */

class ContactFormHandler {
  constructor(formSelector) {
    this.form = document.querySelector(formSelector);

    if (!this.form) return;

    this.successMsg = document.getElementById("contact-success-msg");

    this.validator = new JustValidate(formSelector, {
      errorLabelStyle: {
        display: "block",
      },
      errorLabelCssClass: "alert alert-danger py-2 px-3 mt-1 mb-2",
      errorContainer: (field) => {
        return field.input.closest(".mb-3")?.querySelector(".js-error-message");
      },
    });

    this._setupValidation();
  }

  _setupValidation() {
    this.validator
      .addField("#fName", [
        {
          rule: "required",
          errorMessage: "First name is required.",
        },
        { rule: "minLength", value: 2 },
        { rule: "maxLength", value: 15 },
      ])
      .addField("#lName", [
        {
          rule: "required",
          errorMessage: "Last name is required.",
        },
      ])
      .addField("#email", [
        {
          rule: "required",
          errorMessage: "Please enter a valid email address.",
        },
        {
          rule: "email",
          errorMessage: "That doesn’t look like a real email address!",
        },
      ])
      .addField("#message", [
        {
          rule: "required",
          errorMessage: "Don't leave us hanging! Please write a message.",
        },
        { rule: "minLength", value: 10 },
      ])
      .onSuccess((event) => this._handleSuccess(event));
  }

  _handleSuccess(event) {
    event.preventDefault();

    this.successMsg.classList.remove("d-none");

    anime({
      targets: "#contact-success-msg",
      opacity: [0, 1],
      translateY: [-20, 0],
      duration: 800,
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
      window.location.href = "message-sent.html";
    }, 3000);
  }

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

// Initialize contact form logic
document.addEventListener("DOMContentLoaded", () => {
  new ContactFormHandler("#contactForm");
});
