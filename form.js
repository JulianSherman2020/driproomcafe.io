const validator = new JustValidate("#signupForm");

validator
  .addField("#fName", [
    {
      rule: "required",
    },
    {
      rule: "minLength",
      value: 3,
    },
    {
      rule: "maxLength",
      value: 15,
    },
  ])
  .addField("#email", [
    {
      rule: "required",
    },
    {
      rule: "email",
    },
  ])
  .addField("#create-pwd", [
    {
      rule: "required",
    },
    {
      rule: "password",
      errorMessage:
        "Password must include upper, lower, number, symbol, and be 8-30 characters.",
    },
  ])
  .addField("#confirm-pwd", [
    {
      rule: "required",
    },
    {
      validator: (value, fields) => {
        return value === fields["#create-pwd"].elem.value;
      },
      errorMessage: "Passwords do not match!",
    },
  ])
  .addField("#dob", [
    {
      rule: "required",
    },
  ])
  .addField("#membership", [
    {
      rule: "required",
    },
  ])
  .onSuccess((event) => {
  
      // Show success message
  const successMsg = document.getElementById("form-success-msg");
  successMsg.style.display = "block";

  // Anime.js animation
  anime({
    targets: "#form-success-msg",
    opacity: [0, 1],
    translateY: [-30, 0],
    duration: 800,
    easing: "easeOutExpo",
  });

  // 🌈🎉 Confetti Burst
  confetti({
    particleCount: 150,
    spread: 80,
    origin: { y: 0.6 }, // shoot from middle of screen
    angle: 90,
  });

  // Optional: Fade form
  anime({
    targets: "#signupForm",
    opacity: 0.3,
    duration: 600,
    easing: "easeOutQuad",
  });

  // Redirect after 2.5s
  setTimeout(() => {
    window.location.href = "thankyou.html";
  }, 2500);
});


  