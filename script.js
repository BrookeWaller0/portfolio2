 

menuBtn.addEventListener("click", () => {
  const expanded = menuBtn.getAttribute("aria-expanded") === "true";
  menuBtn.setAttribute("aria-expanded", !expanded);
  mobileNav.hidden = !mobileNav.hidden;
});

// Set current year in footer
document.getElementById("copyYear").textContent = new Date().getFullYear();
const menuBtn = document.getElementById("menuBtn");
const mobileNav = document.getElementById("mobileNav");

menuBtn.addEventListener("click", () => {
  const expanded = menuBtn.getAttribute("aria-expanded") === "true";
  menuBtn.setAttribute("aria-expanded", !expanded);
  mobileNav.hidden = !mobileNav.hidden;
});

// Set current year in footer
document.getElementById("copyYear").textContent = new Date().getFullYear();

// Carousel
const track = document.querySelector('.carousel-track');
const items = Array.from(track.children);
const nextBtn = document.querySelector('.carousel-btn.next');
const prevBtn = document.querySelector('.carousel-btn.prev');
let index = 0;

function updateCarousel() {
  track.style.transform = `translateX(-${index * 100}%)`;
}

nextBtn.addEventListener('click', () => {
  if (index < items.length - 1) index++;
  else index = 0;
  updateCarousel();
});

prevBtn.addEventListener('click', () => {
  if (index > 0) index--;
  else index = items.length - 1;
  updateCarousel();
});
updateCarousel();