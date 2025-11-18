 
document.addEventListener("DOMContentLoaded", () => {
  // Mobile nav toggle (you already have markup)
  const menuBtn = document.getElementById("menuBtn");
  const mobileNav = document.getElementById("mobileNav");
  if (menuBtn && mobileNav) {
    menuBtn.addEventListener("click", () => {
      const isHidden = mobileNav.hasAttribute("hidden");
      if (isHidden) mobileNav.removeAttribute("hidden");
      else mobileNav.setAttribute("hidden", "");
    });
  }

  // Footer year
  const copyYear = document.getElementById("copyYear");
  if (copyYear) copyYear.textContent = new Date().getFullYear();

  // Carousel
  const track = document.querySelector(".carousel-track");
  const items = track ? Array.from(track.children) : [];
  const prevButton = document.querySelector(".carousel-btn.prev");
  const nextButton = document.querySelector(".carousel-btn.next");

  if (!track || items.length === 0) return;

  let currentIndex = 0;
  let slideWidth = items[0].getBoundingClientRect().width;

  function updateSlideWidth() {
    slideWidth = items[0].getBoundingClientRect().width;
    // Re-apply transform on resize so we stay aligned
    track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
  }

  function goTo(index) {
    currentIndex = (index + items.length) % items.length;
    track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
  }

  nextButton?.addEventListener("click", () => goTo(currentIndex + 1));
  prevButton?.addEventListener("click", () => goTo(currentIndex - 1));

  // Keyboard support (left/right arrows)
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") goTo(currentIndex + 1);
    if (e.key === "ArrowLeft") goTo(currentIndex - 1);
  });

  // Resize handling
  window.addEventListener("resize", updateSlideWidth);

  // Initial setup
  updateSlideWidth();
});
