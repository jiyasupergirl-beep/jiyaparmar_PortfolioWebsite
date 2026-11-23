// Mobile menu toggle
const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");
menuBtn.addEventListener("click", () => {
  const open = menu.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", open);
});
menu.querySelectorAll("a").forEach((link) =>
  link.addEventListener("click", () => {
    menu.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
  })
);

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Fill skill bars when the section scrolls into view
const bars = document.querySelectorAll(".bar i");
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.width = entry.target.dataset.level + "%";
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });
bars.forEach((bar) => barObserver.observe(bar));

// Highlight the nav link of the section in view
const links = document.querySelectorAll("nav a[href^='#']");
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      links.forEach((l) =>
        l.classList.toggle("active", l.getAttribute("href") === "#" + entry.target.id)
      );
    }
  });
}, { rootMargin: "-45% 0px -50% 0px" });
document.querySelectorAll("main section").forEach((s) => sectionObserver.observe(s));

// Contact form: validate, then open the visitor's email app with the message filled in
const form = document.getElementById("contactForm");
const status = document.getElementById("formStatus");
const MY_EMAIL = "your.email@example.com"; // TODO: put your real email here

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!name || !emailOk || !message) {
    status.textContent = "Please enter your name, a valid email and a message.";
    return;
  }
  const subject = encodeURIComponent("Portfolio message from " + name);
  const body = encodeURIComponent(message + "\n\nFrom: " + name + " (" + email + ")");
  window.location.href = "mailto:" + MY_EMAIL + "?subject=" + subject + "&body=" + body;
  status.textContent = "Opening your email app. Thank you for reaching out!";
  form.reset();
});
