/* SIGN UP FORM - COFFEE CARD */ 
const signupForm = document.getElementById('signupForm');

// Step 2 - Listen for form submit
signupForm.addEventListener("submit", function (e) {
  e.preventDefault(); // Stops the form from refreshing the page

  // For now, just test it works
  alert("Form submitted! 🔥 (but not really yet)");

  const fName = document.getElementById("fName").value.trim();
  const lName = document.getElementById("lName").value.trim();
  const email = document.getElementById("email").value.trim();
  const dob = document.getElementById("dob").value.trim();
  const createPwd = document.getElementById("create-pwd").value.trim();
  const confirmPwd = document.getElementById("confirm-pwd").value.trim();
  const membership = document.getElementById("membership").value.trim();
});
  
/* FORM VALIDATION */
if (
  !fName ||
  !lName ||
  !email ||
  !dob ||
  !createPwd ||
  !confirmPwd ||
  membership === "select membership"
) {
  alert("😅 Please complete all fields before signing up.");
  return;
}
  



