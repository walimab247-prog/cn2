/* Crypto News — site scripts: mobile menu, FAQ accordion, smooth scroll,
   hero headline auto-fit and contact form handling. */
(function () {
  'use strict';

  function ready(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      fn();
    }
  }

  ready(function () {
    /* ---------------- Mobile navigation menu ---------------- */
    var toggle = document.getElementById('menu-toggle');
    var menu = document.getElementById('nav-menu');

    function closeMenu() {
      if (!menu || !toggle) return;
      menu.setAttribute('hidden', '');
      toggle.setAttribute('aria-expanded', 'false');
    }

    if (toggle && menu) {
      toggle.addEventListener('click', function (event) {
        event.stopPropagation();
        var willOpen = menu.hasAttribute('hidden');
        if (willOpen) {
          menu.removeAttribute('hidden');
        } else {
          menu.setAttribute('hidden', '');
        }
        toggle.setAttribute('aria-expanded', String(willOpen));
      });

      document.addEventListener('click', function (event) {
        if (menu.hasAttribute('hidden')) return;
        if (menu.contains(event.target) || toggle.contains(event.target)) return;
        closeMenu();
      });

      document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') closeMenu();
      });
    }

    /* ---------------- FAQ accordion ---------------- */
    var faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(function (item) {
      var answer = item.querySelector('.faq-answer');
      var icon = item.querySelector('svg');
      if (!answer) return;
      item.setAttribute('role', 'button');
      item.setAttribute('tabindex', '0');
      item.setAttribute('aria-expanded', 'false');

      function toggleFaq() {
        var willOpen = answer.hasAttribute('hidden');
        if (willOpen) {
          answer.removeAttribute('hidden');
        } else {
          answer.setAttribute('hidden', '');
        }
        item.setAttribute('aria-expanded', String(willOpen));
        if (icon) icon.style.transform = willOpen ? 'rotate(45deg)' : '';
      }

      item.addEventListener('click', toggleFaq);
      item.addEventListener('keydown', function (event) {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          toggleFaq();
        }
      });
    });

    /* ---------------- Smooth scrolling for in-page anchors ---------------- */
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function (event) {
        var id = link.getAttribute('href').slice(1);
        if (!id) return;
        var target = document.getElementById(id);
        if (!target) return;
        event.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });

    /* ---------------- Hero headline auto-fit ---------------- */
    var fitElements = document.querySelectorAll('[data-fit-text]');

    function fitText(el) {
      var parent = el.parentElement;
      if (!parent) return;
      var max = 200;
      el.style.fontSize = max + 'px';
      var width = parent.clientWidth;
      var textWidth = el.scrollWidth;
      if (textWidth > 0 && width > 0) {
        var size = Math.floor((max * width) / textWidth) - 1;
        size = Math.max(24, Math.min(max, size));
        el.style.fontSize = size + 'px';
      }
    }

    function fitAll() {
      fitElements.forEach(fitText);
    }

    if (fitElements.length) {
      fitAll();
      window.addEventListener('resize', fitAll);
    }

    /* ---------------- Contact form ---------------- */
    var form = document.getElementById('contact-form');
    if (form) {
      form.addEventListener('submit', function (event) {
        event.preventDefault();
        if (!form.checkValidity()) {
          form.reportValidity();
          return;
        }
        var status = document.getElementById('form-status');
        if (status) {
          status.textContent =
            'Thank you! Your message has been recorded. The editorial team will reply to the email address you provided.';
          status.removeAttribute('hidden');
        }
        form.reset();
      });
    }
  });
})();
