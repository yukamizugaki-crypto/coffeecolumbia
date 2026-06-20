/* ============================================================
   珈琲屋コロンビア — main.js
   ============================================================ */

(function () {
  'use strict';


  /* ---- Hamburger Menu ---- */
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const globalNav    = document.getElementById('global-nav');

  if (hamburgerBtn && globalNav) {
    hamburgerBtn.addEventListener('click', () => {
      const isOpen = hamburgerBtn.classList.toggle('is-open');
      globalNav.classList.toggle('is-open', isOpen);
      document.body.classList.toggle('nav-open', isOpen);
      hamburgerBtn.setAttribute('aria-expanded', String(isOpen));
    });

    // Close on nav link click (mobile)
    globalNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburgerBtn.classList.remove('is-open');
        globalNav.classList.remove('is-open');
        document.body.classList.remove('nav-open');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---- Owner Expand / Collapse ---- */
  const ownerToggleBtn = document.getElementById('owner-toggle-btn');
  const ownerFull      = document.getElementById('owner-full');

  if (ownerToggleBtn && ownerFull) {
    ownerToggleBtn.addEventListener('click', () => {
      const isExpanded = ownerToggleBtn.getAttribute('aria-expanded') === 'true';
      ownerToggleBtn.setAttribute('aria-expanded', String(!isExpanded));
      ownerFull.setAttribute('aria-hidden', String(isExpanded));
      ownerFull.classList.toggle('is-open', !isExpanded);
      ownerToggleBtn.textContent = isExpanded ? '詳しくはこちら' : '閉じる';
      // Re-add the arrow pseudo-element workaround via data attr
      ownerToggleBtn.dataset.expanded = String(!isExpanded);
    });
  }

  /* ---- Scroll Fade-in (Intersection Observer) ---- */
  const fadeEls = document.querySelectorAll(
    '.about-text-block, .about-photo-block, ' +
    '.concept-block-text, .concept-pyramid-wrapper, ' +
    '.concept-block-img, .menu-card, ' +
    '.owner-text-block, .owner-photo-frame, ' +
    '.info-hours, .access-text, .access-map'
  );

  fadeEls.forEach((el, i) => {
    el.classList.add('fade-in');
    if (i % 3 === 1) el.classList.add('fade-in--delay-1');
    if (i % 3 === 2) el.classList.add('fade-in--delay-2');
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  fadeEls.forEach(el => observer.observe(el));

  /* ---- Header background on scroll ---- */
  const siteHeader = document.querySelector('.site-header');
  if (siteHeader) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 80) {
        siteHeader.classList.add('is-scrolled');
      } else {
        siteHeader.classList.remove('is-scrolled');
      }
    }, { passive: true });
  }

  /* ---- Smooth active nav link highlight ---- */
  const navLinks = document.querySelectorAll('.global-nav a');
  const sections = Array.from(navLinks)
    .map(link => link.getAttribute('href'))
    .filter(href => href && href.startsWith('#'))
    .map(href => document.querySelector(href))
    .filter(Boolean);

  if (sections.length && navLinks.length) {
    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            navLinks.forEach(link => link.removeAttribute('data-active'));
            const id = entry.target.id;
            const active = document.querySelector(`.global-nav a[href="#${id}"]`);
            if (active) active.setAttribute('data-active', 'true');
          }
        });
      },
      { threshold: 0.35, rootMargin: '-70px 0px 0px 0px' }
    );
    sections.forEach(sec => navObserver.observe(sec));
  }



  /* ---- Parallax background depth effect for lattices ---- */
  const bgPanels = document.querySelectorAll('.lattice-bg-panel, .footer-lattice');
  if (bgPanels.length && window.matchMedia('(min-width: 900px)').matches) {
    window.addEventListener('scroll', () => {
      bgPanels.forEach(panel => {
        const rect = panel.parentElement.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          // Calculate scroll displacement relative to viewport
          const shift = (window.innerHeight - rect.top) * 0.06;
          panel.style.transform = `translateY(${shift}px)`;
        }
      });
    }, { passive: true });
  }
  /* ---- ABOUT Slideshow (5s interval) ---- */
  const aboutSlides = document.querySelectorAll('.about-slideshow .slide-img');
  if (aboutSlides.length > 1) {
    let currentSlide = 0;
    setInterval(() => {
      aboutSlides[currentSlide].classList.remove('active');
      currentSlide = (currentSlide + 1) % aboutSlides.length;
      aboutSlides[currentSlide].classList.add('active');
    }, 5000);
  }

})();
