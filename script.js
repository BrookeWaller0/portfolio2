document.addEventListener("DOMContentLoaded", () => {
  // ====== ELEMENTS ======
  const carousel = document.querySelector(".carousel");
  const track = carousel.querySelector(".carousel-track");
  const items = Array.from(track.children);
  const prevBtn = carousel.querySelector(".carousel-btn.prev");
  const nextBtn = carousel.querySelector(".carousel-btn.next");

  // Create dots dynamically (optional but recommended)
  let dotsNav = carousel.querySelector(".carousel-dots");
  if (!dotsNav) {
    dotsNav = document.createElement("div");
    dotsNav.className = "carousel-dots";
    carousel.appendChild(dotsNav);
  }
  const dots = items.map((_, i) => {
    const btn = document.createElement("button");
    btn.className = "carousel-dot";
    btn.type = "button";
    btn.setAttribute("aria-label", `Go to slide ${i + 1}`);
    dotsNav.appendChild(btn);
    return btn;
  });

  // ====== STATE ======
  let index = 0;
  let slideWidth = getSlideWidth();
  let autoplayTimer = null;
  const autoplayDelay = 5000; // ms
  const enableAutoplay = true; // toggle if you want autoplay

  // ====== FUNCTIONS ======
  function getSlideWidth() {
    // Use carousel’s inner width to avoid layout shifts
    return carousel.clientWidth;
  }

  function updateTransform() {
    track.style.transform = `translateX(-${index * slideWidth}px)`;
    updateDots();
    updateButtons();
  }

  function updateDots() {
    dots.forEach((d, i) => {
      if (i === index) {
        d.setAttribute("aria-current", "true");
      } else {
        d.removeAttribute("aria-current");
      }
    });
  }

  function updateButtons() {
    // If you prefer hard stops (no loop), uncomment below:
    // prevBtn.disabled = index === 0;
    // nextBtn.disabled = index === items.length - 1;
  }

  function goTo(i) {
    const count = items.length;
    // Looping behavior:
    index = ((i % count) + count) % count;
    updateTransform();
  }

  function next() {
    goTo(index + 1);
  }

  function prev() {
    goTo(index - 1);
  }

  function handleResize() {
    slideWidth = getSlideWidth();
    updateTransform();
  }

  function startAutoplay() {
    if (!enableAutoplay || autoplayTimer) return;
    autoplayTimer = setInterval(next, autoplayDelay);
  }

  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }

  // ====== EVENTS ======
  nextBtn.addEventListener("click", next);
  prevBtn.addEventListener("click", prev);

  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => goTo(i));
  });

  // Keyboard support
  carousel.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
  });

  // Resize recalculates slide width
  window.addEventListener("resize", handleResize);

  // Autoplay: pause on hover/focus, resume on mouseleave/blur
  if (enableAutoplay) {
    startAutoplay();
    carousel.addEventListener("mouseenter", stopAutoplay);
    carousel.addEventListener("mouseleave", startAutoplay);
    carousel.addEventListener("focusin", stopAutoplay);
    carousel.addEventListener("focusout", startAutoplay);
  }

  // Touch swipe support
  let startX = 0;
  let deltaX = 0;
  let isDragging = false;

  function onTouchStart(e) {
    isDragging = true;
    startX = e.touches ? e.touches[0].clientX : e.clientX;
    stopAutoplay();
  }

  function onTouchMove(e) {
    if (!isDragging) return;
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    deltaX = x - startX;
    track.style.transform = `translateX(${-(index * slideWidth) + deltaX}px)`;
  }

  function onTouchEnd() {
    if (!isDragging) return;
    isDragging = false;

    // threshold: swipe at least 1/4 slide width
    const threshold = slideWidth / 4;
    if (deltaX > threshold) {
      prev();
    } else if (deltaX < -threshold) {
      next();
    } else {
      updateTransform();
    }
    deltaX = 0;
    startAutoplay();
  }

  track.addEventListener("touchstart", onTouchStart, { passive: true });
  track.addEventListener("touchmove", onTouchMove, { passive: true });
  track.addEventListener("touchend", onTouchEnd);

  track.addEventListener("mousedown", onTouchStart);
  window.addEventListener("mousemove", onTouchMove);
  window.addEventListener("mouseup", onTouchEnd);

  // ====== INIT ======
  // Set tabindex for keyboard focus
  carousel.setAttribute("tabindex", "0");

  // Ensure images are loaded before initial width calc (avoids flash)
  const media = track.querySelectorAll("img, video, iframe, embed");
  let pending = media.length;
  if (pending === 0) {
    handleResize();
    updateTransform();
  } else {
    media.forEach((m) => {
      if (m.complete || m.readyState >= 2) {
        pending--;
        if (pending === 0) {
          handleResize();
          updateTransform();
        }
      } else {
        m.addEventListener("load", () => {
          pending--;
          if (pending === 0) {
            handleResize();
            updateTransform();
          }
        });
        m.addEventListener("error", () => {
          // still proceed if an asset fails
          pending--;
          if (pending === 0) {
            handleResize();
            updateTransform();
          }
        });
      }
    });
  }
});
