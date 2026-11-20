(function () {
  var header = document.querySelector('.site-header');
  var toggle = document.querySelector('.nav-toggle');
  var menu = document.querySelector('.mobile-menu');
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function setMenu(open) {
    if (!toggle || !menu) return;
    menu.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
  }
  if (toggle) toggle.addEventListener('click', function () {
    setMenu(toggle.getAttribute('aria-expanded') !== 'true');
  });
  if (menu) menu.addEventListener('click', function (event) {
    if (event.target.closest('a')) setMenu(false);
  });
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      setMenu(false);
      if (toggle) toggle.focus();
    }
  });
  function updateHeader() {
    if (header) header.classList.toggle('scrolled', window.scrollY > 40);
  }
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive:true });

  if (!reducedMotion.matches && 'IntersectionObserver' in window) {
    var revealElements = document.querySelectorAll('[data-reveal]');
    revealElements.forEach(function (element) {
      if (!element.hasAttribute('style')) {
        element.style.setProperty('--reveal-delay', '0ms');
      }
    });
    var revealObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        entry.target.querySelectorAll('[data-count-to]').forEach(countUp);
        observer.unobserve(entry.target);
      });
    }, { threshold:.12, rootMargin:'0px 0px -36px 0px' });
    revealElements.forEach(function (element) { revealObserver.observe(element); });
  }
  document.querySelectorAll('[data-reveal]').forEach(function (element, index) {
    if (!element.style.getPropertyValue('--reveal-delay')) {
      element.style.setProperty('--reveal-delay', ((index % 4) * 100) + 'ms');
    }
  });
  if (reducedMotion.matches) {
    document.querySelectorAll('[data-reveal]').forEach(function (element) { element.classList.add('is-visible'); });
  }

  function countUp(element) {
    if (element.dataset.counted === 'true') return;
    element.dataset.counted = 'true';
    var target = Number(element.dataset.countTo);
    var prefix = element.dataset.countPrefix || '';
    var suffix = element.dataset.countSuffix || '';
    var start = performance.now();
    var duration = 1200;
    function update(now) {
      var progress = Math.min((now - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 4);
      element.textContent = prefix + Math.round(target * eased).toLocaleString('en-US') + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  var processLine = document.querySelector('.process-line');
  if (processLine && 'IntersectionObserver' in window) {
    var lineObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          lineObserver.unobserve(entry.target);
        }
      });
    }, { threshold:.3 });
    lineObserver.observe(processLine);
  }

  document.querySelectorAll('.filter-btn').forEach(function (button) {
    button.addEventListener('click', function () {
      var filter = button.dataset.filter;
      document.querySelectorAll('.filter-btn').forEach(function (item) { item.classList.toggle('active', item === button); });
      var visible = 0;
      document.querySelectorAll('[data-category]').forEach(function (card) {
        var match = filter === 'all' || card.dataset.category.split(' ').indexOf(filter) !== -1;
        card.classList.toggle('is-hidden', !match);
        if (match) visible += 1;
      });
      var count = document.querySelector('[data-filter-count]');
      if (count) count.textContent = visible + (visible === 1 ? ' project' : ' projects');
    });
  });

  var workedRegions = document.querySelectorAll('.worked-region');
  var workedStatus = document.getElementById('worked-status');
  var mapGroups = document.querySelectorAll('[data-map-region]');
  function activateCoverage(region) {
    workedRegions.forEach(function (button) {
      var active = button.dataset.region === region;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    mapGroups.forEach(function (group) {
      group.classList.toggle('active', group.dataset.mapRegion === region);
    });
    document.querySelectorAll('.world-marker').forEach(function (marker) {
      marker.classList.toggle('active', marker.dataset.mapRegion === region);
    });
    document.querySelectorAll('.world-route').forEach(function (route) {
      var isRoute = region === 'kathmandu'
        ? route.classList.contains('route-kathmandu')
        : route.classList.contains('route-online');
      route.style.opacity = isRoute ? '.9' : '.16';
    });
    if (workedStatus) {
      workedStatus.textContent = region === 'kathmandu'
        ? 'Kathmandu Valley · Confirmed LAN production'
        : 'Nationwide · Online tournament delivery';
    }
  }
  workedRegions.forEach(function (button) {
    button.addEventListener('click', function () { activateCoverage(button.dataset.region); });
  });
  activateCoverage('kathmandu');

  var year = document.querySelectorAll('[data-year]');
  year.forEach(function (element) { element.textContent = new Date().getFullYear(); });
})();
