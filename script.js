const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".site-nav");
const navLinks = nav.querySelectorAll("a");

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 24);
}, { passive: true });

menuToggle.addEventListener("click", () => {
  const open = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!open));
  menuToggle.classList.toggle("active", !open);
  nav.classList.toggle("open", !open);
  document.body.classList.toggle("menu-open", !open);
});

navLinks.forEach(link => link.addEventListener("click", () => {
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.classList.remove("active");
  nav.classList.remove("open");
  document.body.classList.remove("menu-open");
}));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: "0px 0px -40px" });

document.querySelectorAll(".reveal").forEach((el, index) => {
  el.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`;
  observer.observe(el);
});

const form = document.getElementById("styling-form");
const status = form.querySelector(".form-status");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = form.elements.name.value.trim();
  status.textContent = `Thank you${name ? `, ${name}` : ""}. Your styling request has been received.`;
  form.reset();
});

document.getElementById("year").textContent = new Date().getFullYear();

document.querySelectorAll(".accordion details").forEach((detail) => {
  detail.addEventListener("toggle", () => {
    if (!detail.open) return;
    document.querySelectorAll(".accordion details[open]").forEach((other) => {
      if (other !== detail) other.removeAttribute("open");
    });
  });
});