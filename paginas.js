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
