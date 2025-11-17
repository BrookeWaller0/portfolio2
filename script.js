 const menuBtn = document.getElementById("menuBtn");
const mobileNav = document.getElementById("mobileNav");

menuBtn.addEventListener("click", () => {
  const expanded = menuBtn.getAttribute("aria-expanded") === "true";
  menuBtn.setAttribute("aria-expanded", !expanded);
  mobileNav.hidden = !mobileNav.hidden;
});

// Set current year in footer
document.getElementById("copyYear").textContent = new Date().getFullYear();
