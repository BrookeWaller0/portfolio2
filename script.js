 

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
document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".carousel-track");
  const items = Array.from(track.children);
  const prevButton = document.querySelector(".carousel-btn.prev");
  const nextButton = document.querySelector(".carousel-btn.next");

  let currentIndex = 0;

  function updateCarousel() {
    const width = items[0].getBoundingClientRect().width;
    track.style.transform = `translateX(-${currentIndex * width}px)`;
  }

  nextButton.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % items.length;
    updateCarousel();
  });

  prevButton.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    updateCarousel();
  });

  // Initial setup
  updateCarousel();
});
// Add after initial setup if you want auto-slide
const intervalMs = 4000;
let auto = setInterval(() => goTo(currentIndex + 1), intervalMs);

// Pause on hover
track.parentElement.addEventListener("mouseenter", () => clearInterval(auto));
track.parentElement.addEventListener("mouseleave", () => {
  auto = setInterval(() => goTo(currentIndex + 1), intervalMs);
});
