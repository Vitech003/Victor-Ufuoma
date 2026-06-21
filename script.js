// Victor Ufuoma Studio — shared site behaviour

document.addEventListener('DOMContentLoaded', function () {
  // Mobile nav toggle
  var toggle = document.querySelector('.menu-toggle');
  var mobileNav = document.querySelector('.mobile-nav');
  if (toggle && mobileNav) {
    toggle.addEventListener('click', function () {
      var isOpen = mobileNav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  // Mobile sub-menu (Works) expand
  var subToggle = document.querySelector('.mobile-nav .sub-toggle');
  var subList = document.querySelector('.mobile-nav .sub');
  if (subToggle && subList) {
    subToggle.addEventListener('click', function (e) {
      e.preventDefault();
      subList.style.display = subList.style.display === 'block' ? 'none' : 'block';
    });
  }

  // Contact form -> mailto (front-end only, no backend attached)
  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = encodeURIComponent(document.getElementById('cf-name').value || '');
      var email = document.getElementById('cf-email').value || '';
      var project = encodeURIComponent(document.getElementById('cf-project').value || '');
      var message = encodeURIComponent(document.getElementById('cf-message').value || '');
      var subject = encodeURIComponent('New project enquiry from ' + decodeURIComponent(name || 'website visitor'));
      var body = 'Name: ' + decodeURIComponent(name) +
        '\nEmail: ' + email +
        '\nProject type: ' + decodeURIComponent(project) +
        '\n\nMessage:\n' + decodeURIComponent(message);

      // NOTE: replace REPLACE_WITH_EMAIL in this file's mailto target via contact.html data attribute
      var target = form.getAttribute('data-mailto') || 'hello@example.com';
      window.location.href = 'mailto:' + target + '?subject=' + subject + '&body=' + encodeURIComponent(body);
    });
  }

  // Scroll-triggered section transitions
  var revealTargets = document.querySelectorAll('.reveal, .reveal-stagger');
  if (revealTargets.length) {
    if ('IntersectionObserver' in window) {
      var revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -80px 0px' });
      revealTargets.forEach(function (el) { revealObserver.observe(el); });
    } else {
      revealTargets.forEach(function (el) { el.classList.add('in-view'); });
    }
  }
});
