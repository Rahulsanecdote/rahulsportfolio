// app.js - Modern Portfolio JavaScript

class PortfolioApp {
  constructor() {
    this.currentTheme = "light";
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.setupThemeToggle();
    this.setupScrollAnimations();
    this.setupNavigation();
    this.setupContactForm();
    this.setupLoadingScreen();
    this.createStarfield();
    this.setupMobileMenu();
  }

  setupEventListeners() {
    window.addEventListener("scroll", this.handleScroll.bind(this));
    window.addEventListener("resize", this.handleResize.bind(this));
    window.addEventListener("load", this.handleLoad.bind(this));
  }

  setupLoadingScreen() {
    const loadingScreen = document.getElementById("loadingScreen");
    setTimeout(() => {
      loadingScreen.classList.add("hidden");
      this.animateHeroElements();
    }, 1800);
  }

  animateHeroElements() {
    const heroElements = document.querySelectorAll(
      ".hero .fade-in, .hero .slide-up"
    );
    heroElements.forEach((element, index) => {
      setTimeout(() => {
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      }, index * 200);
    });
  }

  setupThemeToggle() {
    const themeToggle = document.getElementById("themeToggle");
    const themeIcon = themeToggle.querySelector(".theme-icon");
    document.documentElement.setAttribute("data-color-scheme", this.currentTheme);
    this.updateThemeIcon(themeIcon, this.currentTheme);
    themeToggle.addEventListener("click", () => {
      this.currentTheme = this.currentTheme === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-color-scheme", this.currentTheme);
      this.updateThemeIcon(themeIcon, this.currentTheme);
      document.body.style.transition = "all 0.3s ease";
      setTimeout(() => {
        document.body.style.transition = "";
      }, 330);
    });
  }

  updateThemeIcon(icon, theme) {
    icon.textContent = theme === "dark" ? "☀️" : "🌙";
  }

  setupScrollAnimations() {
    const fadeInEls = document.querySelectorAll(".fade-in, .slide-up");
    const onScroll = () => {
      fadeInEls.forEach((el) => {
        if (this.isElementInViewport(el)) {
          el.classList.add("visible");
        }
      });
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
  }

  isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top < window.innerHeight - 80 &&
      rect.bottom > 40
    );
  }

  setupNavigation() {
    // Scroll to section with offset for fixed navbar
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute("href"));
        if (target) {
          window.scrollTo({
            top: target.offsetTop - 68,
            behavior: "smooth",
          });
        }
      });
    });
  }

  setupContactForm() {
    const contactForm = document.getElementById("contactForm");
    if (!contactForm) return;
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      // Basic validation
      const name = contactForm.name.value.trim();
      const email = contactForm.email.value.trim();
      const message = contactForm.message.value.trim();
      if (!name || !email || !message) {
        alert("Please fill all required fields.");
        return;
      }
      // Simulate sending (replace with your backend/API logic)
      alert(
        "Thank you, " +
          name +
          "! Your message has been sent. I will get back to you soon."
      );
      contactForm.reset();
    });
  }

  handleScroll() {
    // Navbar effects can be implemented here.
  }

  handleResize() {
    // Responsive adjustments if needed.
  }

  handleLoad() {
    // Can trigger entrance animations here if needed.
  }

  createStarfield() {
    // Minimal animated starfield effect for hero background
    const canvas = document.getElementById("starfield");
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = 420;
    const ctx = canvas.getContext("2d");
    const stars = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2.1 + 0.7,
      s: Math.random() * 0.4 + 0.12,
    }));
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let star of stars) {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, 2 * Math.PI);
        ctx.fillStyle = "rgba(33,158,173,0.85)";
        ctx.shadowColor = "#fffedd";
        ctx.shadowBlur = 8;
        ctx.fill();
        star.y += star.s;
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }
      }
      requestAnimationFrame(animate);
    }
    animate();
    window.addEventListener("resize", function () {
      canvas.width = window.innerWidth;
      canvas.height = 420;
    });
  }

  setupMobileMenu() {
    // Mobile navigation toggle logic can be added here
  }
}

window.addEventListener("DOMContentLoaded", function () {
  new PortfolioApp();
});
