// Comportamiento compartido de las páginas de producto (ÁRBOLA ERP y ÁRBOLA 3R).
// Es el mismo menú de celular y el mismo banner de cookies que usa index.html.

(function () {
  // ── MENÚ DE CELULAR ──
  const toggle  = document.getElementById('menuToggle');
  const menu    = document.getElementById('mobileMenu');
  const overlay = document.getElementById('mobileOverlay');
  if (toggle && menu && overlay) {
    const close = () => { menu.classList.remove('open'); overlay.classList.remove('open'); toggle.classList.remove('active'); };
    const open  = () => { menu.classList.add('open');    overlay.classList.add('open');    toggle.classList.add('active'); };
    toggle.addEventListener('click', () => menu.classList.contains('open') ? close() : open());
    overlay.addEventListener('click', close);
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
  }
})();

(function () {
  // ── MOVIMIENTO AL HACER SCROLL (mismo efecto que el inicio) ──
  if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  document.documentElement.classList.add('js-anim');

  const SEL = '.sec-label, .sec h2, .sec-sub, .tri-card, .mod-card, .status-card, .why-item, .band-3r, .eje, .acceso, .industrias li, .r-item, .cta-band h2, .cta-band p, .cta-band .btn';
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      el.classList.add('visible');
      observer.unobserve(el);
      // al terminar la entrada, quitar las clases para no frenar el hover de las tarjetas
      el.addEventListener('transitionend', () => { el.classList.remove('reveal', 'visible'); el.style.transitionDelay = ''; }, { once: true });
    });
  }, { threshold: 0.15 });

  document.querySelectorAll(SEL).forEach(el => {
    // Escalonado entre hermanos de una misma grilla
    const i = [...el.parentElement.children].filter(c => c.matches(SEL)).indexOf(el);
    if (i > 0) el.style.transitionDelay = (Math.min(i, 5) * 0.09) + 's';
    el.classList.add('reveal');
    observer.observe(el);
  });

  // El recorrido de "Cómo funciona" se dibuja cuando entra en pantalla
  const steps = document.querySelector('.diag-steps.cuatro');
  if (steps) {
    new IntersectionObserver(([e], o) => {
      if (e.isIntersecting) { steps.classList.add('drawn'); o.disconnect(); }
    }, { threshold: 0.35 }).observe(steps);
  }
})();

(function () {
  // ── BANNER DE COOKIES (Consent Mode v2) ──
  var KEY = 'arbola_cookie_consent';
  var banner = document.getElementById('cookie-banner');
  if (!banner) return;
  function show() {
    banner.hidden = false;
    requestAnimationFrame(function () { banner.classList.add('is-visible'); });
  }
  function hide() {
    banner.classList.remove('is-visible');
    setTimeout(function () { banner.hidden = true; }, 350);
  }
  var choice = null;
  try { choice = localStorage.getItem(KEY); } catch (e) {}
  if (choice !== 'accepted' && choice !== 'rejected') { show(); }

  document.getElementById('cookie-accept').addEventListener('click', function () {
    try { localStorage.setItem(KEY, 'accepted'); } catch (e) {}
    if (typeof gtag === 'function') { gtag('consent', 'update', { 'analytics_storage': 'granted' }); }
    hide();
  });
  document.getElementById('cookie-reject').addEventListener('click', function () {
    try { localStorage.setItem(KEY, 'rejected'); } catch (e) {}
    if (typeof gtag === 'function') { gtag('consent', 'update', { 'analytics_storage': 'denied' }); }
    hide();
  });
})();
