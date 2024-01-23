const checkbox = document.getElementById("checkbox");
let fontLight = Array.from(document.querySelectorAll('.font-dark'))

checkbox.addEventListener("change", () => {
  document.body.classList.toggle("dark");
  document.body.classList.toggle("font-light");
});