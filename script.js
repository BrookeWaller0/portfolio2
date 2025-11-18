document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu toggle (keeps your existing behavior if you had it)
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

  // Portfolio cards keyboard support
  const cards = document.querySelectorAll(".portfolio-card");
  cards.forEach((card) => {
    card.setAttribute("tabindex", "0");
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const btn = card.querySelector(".portfolio-view-btn");
        if (btn) btn.click();
      }
    });
  });
});
