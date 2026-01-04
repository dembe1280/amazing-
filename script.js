function scrollToSection() {
  document.getElementById("explore").scrollIntoView({ behavior: "smooth" });
}

const circle = document.getElementById("circle");
const message = document.getElementById("message");

circle.addEventListener("click", () => {
  message.textContent = "🔥 BOOM! You activated the magic!";
  message.style.color = "cyan";
});
