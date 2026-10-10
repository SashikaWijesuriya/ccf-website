// Colombo Chess Festival 2026 – site interactions
(function () {
  // Mobile navigation
  var toggle = document.querySelector('.nav__toggle');
  var menu = document.getElementById('nav-menu');

  function setMenu(open) {
    menu.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }

  toggle.addEventListener('click', function () {
    setMenu(!menu.classList.contains('is-open'));
  });
  menu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () { setMenu(false); });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setMenu(false);
  });

  // Prize tabs
  var tabs = document.querySelectorAll('.tab');
  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      tabs.forEach(function (t) {
        var active = t === tab;
        var panel = document.getElementById(t.getAttribute('aria-controls'));
        t.classList.toggle('is-active', active);
        t.setAttribute('aria-selected', String(active));
        panel.classList.toggle('is-active', active);
        panel.hidden = !active;
      });
    });
  });

  // Highlight the current section in the nav
  var links = menu.querySelectorAll('a[href^="#"]');
  var sections = Array.prototype.map.call(links, function (a) {
    return document.querySelector(a.getAttribute('href'));
  }).filter(Boolean);

  if ('IntersectionObserver' in window) {
    var navObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (a) {
          a.classList.toggle('is-current', a.getAttribute('href') === '#' + entry.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { navObserver.observe(s); });

    // Reveal on scroll
    var revealTargets = document.querySelectorAll('.title, .section__intro, .card, .prize, .stat, .timeline li, .contact, .rules details, .fee-table, .organiser__stage, .gallery__item');
    var revealObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealTargets.forEach(function (el) {
      el.classList.add('reveal');
      revealObserver.observe(el);
    });
  }

  document.getElementById('year').textContent = new Date().getFullYear();
})();
