/* ============================================================
   REPORTE SEMANAL 6 — FrioPacking — script.js
   JavaScript básico, sin librerías externas.
   Los acordeones de cada día usan <details>/<summary> nativos,
   por lo que no necesitan JavaScript para abrir/cerrar.
   ------------------------------------------------------------
   Contenido:
   1. Barra de progreso de lectura
   2. Botón "volver arriba"
   3. Aparición suave de secciones al hacer scroll (reveal)
   4. Resaltado del enlace activo en el menú
   5. Ampliar fotografía al hacer clic (sin galería separada)
   6. Botón para imprimir / guardar como PDF
   7. Respaldo del avatar en "Sobre mí" si la foto no está disponible
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- 1. Barra de progreso de lectura ---------- */
  var progressFill = document.getElementById('progress-fill');

  function updateProgress() {
    var scrollTop = window.scrollY || document.documentElement.scrollTop;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (progressFill) progressFill.style.width = percent + '%';
  }

  /* ---------- 2. Botón "volver arriba" ---------- */
  var backToTop = document.getElementById('back-to-top');

  function updateBackToTop() {
    if (!backToTop) return;
    if (window.scrollY > 500) backToTop.classList.add('is-visible');
    else backToTop.classList.remove('is-visible');
  }

  if (backToTop) {
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  var ticking = false;
  window.addEventListener('scroll', function () {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        updateProgress();
        updateBackToTop();
        ticking = false;
      });
      ticking = true;
    }
  });
  updateProgress();
  updateBackToTop();

  /* ---------- 3. Aparición suave al hacer scroll ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if ('IntersectionObserver' in window && !prefersReducedMotion) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- 4. Enlace activo en el menú según la sección visible ---------- */
  var navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  var trackedSections = [];
  navLinks.forEach(function (link) {
    var id = link.getAttribute('href').slice(1);
    var target = document.getElementById(id);
    if (target) trackedSections.push({ link: link, target: target });
  });

  if ('IntersectionObserver' in window && trackedSections.length) {
    var navObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var match = trackedSections.find(function (s) { return s.target === entry.target; });
        if (!match) return;
        if (entry.isIntersecting) {
          navLinks.forEach(function (l) { l.removeAttribute('aria-current'); });
          match.link.setAttribute('aria-current', 'true');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    trackedSections.forEach(function (s) { navObserver.observe(s.target); });
  }

  /* ---------- 5. Ampliar fotografía al hacer clic ---------- */
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightbox-img');
  var lightboxCaption = document.getElementById('lightbox-caption');
  var lightboxClose = document.getElementById('lightbox-close');
  var photoImages = document.querySelectorAll('.photo img');

  /* Elemento que abrió el lightbox por última vez, para devolverle el foco al cerrar */
  var lastTrigger = null;

  function getFigcaptionText(img) {
    var figcaption = img.parentElement.querySelector('figcaption');
    return figcaption ? figcaption.textContent.trim() : '';
  }

  /* Etiqueta accesible específica por foto: "Ampliar fotografía: <pie de foto>" */
  function buildZoomLabel(img) {
    var captionText = getFigcaptionText(img);
    return captionText ? ('Ampliar fotografía: ' + captionText) : 'Ampliar fotografía';
  }

  function openLightbox(img) {
    lastTrigger = img;
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxCaption.textContent = getFigcaptionText(img);
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
    lightboxClose.focus();
  }

  function closeLightbox() {
    lightbox.hidden = true;
    lightboxImg.src = '';
    document.body.style.overflow = '';
    if (lastTrigger) {
      lastTrigger.focus();
      lastTrigger = null;
    }
  }

  photoImages.forEach(function (img) {
    img.addEventListener('click', function () { openLightbox(img); });
    img.setAttribute('tabindex', '0');
    img.setAttribute('role', 'button');
    img.setAttribute('aria-label', buildZoomLabel(img));
    img.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(img);
      }
    });
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightbox) {
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && lightbox && !lightbox.hidden) closeLightbox();
  });

  /* ---------- 6. Imprimir / guardar como PDF ---------- */
  var printBtn = document.getElementById('print-btn');
  if (printBtn) {
    printBtn.addEventListener('click', function () { window.print(); });
  }

  /* ---------- 7. Respaldo del avatar en "Sobre mí" ---------- */
  var aboutAvatar = document.querySelector('.about-avatar');
  var aboutAvatarImg = aboutAvatar ? aboutAvatar.querySelector('img') : null;
  if (aboutAvatarImg) {
    aboutAvatarImg.addEventListener('error', function () {
      aboutAvatar.classList.add('avatar--fallback');
    });
  }

});
