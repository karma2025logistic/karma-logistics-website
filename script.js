/* script.js
   KARMA Worldwide Logistics LLP
   Shared interactivity for all pages
   Features:
   - Hero slider autoplay + manual controls
   - Mobile menu toggle
   - Scroll lock for mobile menu open state
*/

// =============== HERO SLIDER ===============
(function() {
  const slider = document.getElementById("heroSlider");
  if (!slider) return; // run only on pages that have a heroSlider

  const slides = slider.querySelectorAll(".slide");
  const dotsContainer = document.getElementById("sliderDots");
  const prevBtn = slider.querySelector(".slider-prev");
  const nextBtn = slider.querySelector(".slider-next");

  let current = 0;
  let interval;
  const delay = 5000; // milliseconds between slides

  // Create dots
  slides.forEach((_, idx) => {
    const dot = document.createElement("div");
    dot.className = "slider-dot" + (idx === 0 ? " active" : "");
    dot.dataset.index = idx;
    dotsContainer.appendChild(dot);
  });
  const dots = dotsContainer.querySelectorAll(".slider-dot");

  function showSlide(index) {
    slides[current].classList.remove("active");
    dots[current].classList.remove("active");
    current = (index + slides.length) % slides.length;
    slides[current].classList.add("active");
    dots[current].classList.add("active");
  }

  function nextSlide() { showSlide(current + 1); }
  function prevSlide() { showSlide(current - 1); }

  function startAuto() {
    stopAuto();
    interval = setInterval(nextSlide, delay);
  }

  function stopAuto() {
    if (interval) clearInterval(interval);
  }

  // Attach events
  nextBtn.addEventListener("click", () => { nextSlide(); startAuto(); });
  prevBtn.addEventListener("click", () => { prevSlide(); startAuto(); });
  dots.forEach(dot => {
    dot.addEventListener("click", () => {
      const index = parseInt(dot.dataset.index, 10);
      showSlide(index);
      startAuto();
    });
  });

  // Start autoplay
  startAuto();

  // Pause on hover
  slider.addEventListener("mouseenter", stopAuto);
  slider.addEventListener("mouseleave", startAuto);
})();

// =============== MOBILE MENU TOGGLE ===============
(function() {
  const btn = document.getElementById("mobileMenuBtn");
  const body = document.body;
  if (!btn) return;

  btn.addEventListener("click", () => {
    body.classList.toggle("mobile-menu-open");
  });

  // Close menu when clicking a nav link
  document.querySelectorAll(".main-nav a").forEach(link => {
    link.addEventListener("click", () => {
      body.classList.remove("mobile-menu-open");
    });
  });
})();


// Animate elements on scroll
const animatedEls = document.querySelectorAll('[data-animate]');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.15 });
animatedEls.forEach(el => observer.observe(el));
