document.addEventListener('DOMContentLoaded', () => {
  // 1. Year logic
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 2. Fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });

  // 3. Category tabs (no framework, tiny)
  const tabs = document.querySelectorAll(".tab");
  if (tabs.length > 0) {
    tabs.forEach(btn => {
      btn.addEventListener("click", () => {
        tabs.forEach(t => t.classList.remove("tab--active"));
        btn.classList.add("tab--active");
        const target = document.getElementById(btn.dataset.target);
        if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  }

  // 4. Search filter
  const search = document.getElementById("menuSearch");
  if (search) {
    const items = document.querySelectorAll(".menuItem");
    search.addEventListener("input", (e) => {
      const q = (e.target.value || "").toLowerCase().trim();
      items.forEach(it => {
        const hay = (it.getAttribute("data-name") || "").toLowerCase();
        it.style.display = (!q || hay.includes(q)) ? "" : "none";
      });
    });
  }

  // 5. Mobile nav (from app.js)
  const btn = document.querySelector("[data-navbtn]");
  const nav = document.querySelector("[data-nav]");
  if (btn && nav) {
    btn.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });

    // close on link click (mobile)
    nav.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", () => {
        nav.classList.remove("is-open");
        btn.setAttribute("aria-expanded", "false");
      });
    });
  }

  // 6. Sticky WhatsApp Reveal past Hero
  const stickyWa = document.querySelector('.js-sticky-wa');
  const heroSection = document.querySelector('.hero') || document.querySelector('.pagehero');

  if (stickyWa && heroSection) {
    const waObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          stickyWa.classList.add('is-visible');
        } else {
          stickyWa.classList.remove('is-visible');
        }
      });
    }, {
      rootMargin: "0px",
      threshold: 0
    });
    waObserver.observe(heroSection);
  }
});
