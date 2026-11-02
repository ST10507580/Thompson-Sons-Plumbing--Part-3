/* =====================================================================
   THOMPSON & SONS PLUMBING — script.js
   WEDE5020 Part 3 — Enhancing Functionality and SEO
   Sections below are labelled to match the module brief.
   ===================================================================== */


document.addEventListener('DOMContentLoaded', function () {

  /* ---------------------------------------------------------------------
     MOBILE NAVIGATION (carried over from Part 1/2)
     ------------------------------------------------------------------ */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  /* ---------------------------------------------------------------------
     2.2 DYNAMIC CONTENT — testimonials loaded into the homepage from a
     JavaScript data array, rather than being hard-coded in the HTML.
     ------------------------------------------------------------------ */
  var testimonials = [
    { quote: "Called at 6am with a burst geyser — they were at my door by 7:15 and it was fixed before I left for work.", name: 'Nomsa D.', area: 'Bryanston' },
    { quote: "Fair quote, no upsell, and they cleaned up after themselves. Exactly what you want from a plumber.", name: 'Werner P.', area: 'Randburg' },
    { quote: "Our tenant had a blocked drain on a Sunday — Thompson & Sons had someone out within two hours.", name: 'Lindiwe M.', area: 'Property Manager, Roodepoort' }
  ];
  var testimonialGrid = document.querySelector('#testimonial-grid');
  if (testimonialGrid) {
    testimonialGrid.innerHTML = testimonials.map(function (t) {
      return '<blockquote>“' + t.quote + '”<cite>— ' + t.name + ', ' + t.area + '</cite></blockquote>';
    }).join('');
  }

  /* ---------------------------------------------------------------------
     2.2 DYNAMIC CONTENT — search/filter functionality on the Services
     page. Filters the service cards already in the DOM by keyword;
     nothing is removed, so the content stays crawlable for SEO even
     with JavaScript disabled.
     ------------------------------------------------------------------ */
  var filterInput = document.querySelector('#service-filter');
  var filterEmpty = document.querySelector('#service-filter-empty');
  if (filterInput) {
    var filterCards = document.querySelectorAll('[data-filterable]');
    filterInput.addEventListener('input', function () {
      var term = filterInput.value.trim().toLowerCase();
      var visibleCount = 0;
      filterCards.forEach(function (card) {
        var match = card.textContent.toLowerCase().indexOf(term) !== -1;
        card.style.display = match ? '' : 'none';
        if (match) visibleCount++;
      });
      if (filterEmpty) filterEmpty.style.display = visibleCount === 0 ? 'block' : 'none';
    });
  }

  /* ---------------------------------------------------------------------
     2.1 INTERACTIVE ELEMENTS — accordion (FAQ)
     ------------------------------------------------------------------ */
  document.querySelectorAll('.accordion-item').forEach(function (item) {
    var btn = item.querySelector('.accordion-trigger');
    var panel = item.querySelector('.accordion-panel');
    if (!btn || !panel) return;
    btn.addEventListener('click', function () {
      var isOpen = item.classList.contains('open');
      document.querySelectorAll('.accordion-item.open').forEach(function (openItem) {
        if (openItem !== item) {
          openItem.classList.remove('open');
          openItem.querySelector('.accordion-trigger').setAttribute('aria-expanded', 'false');
        }
      });
      item.classList.toggle('open', !isOpen);
      btn.setAttribute('aria-expanded', String(!isOpen));
    });
  });

  /* ---------------------------------------------------------------------
     2.1 INTERACTIVE ELEMENTS — lightbox for the "Recent Work" gallery
     ------------------------------------------------------------------ */
  var lightbox = document.querySelector('#lightbox');
  var lightboxImg = document.querySelector('#lightbox-img');
  var lightboxClose = document.querySelector('#lightbox-close');
  var galleryImgs = document.querySelectorAll('.photo-frame img');
  if (lightbox && lightboxImg && galleryImgs.length) {
    galleryImgs.forEach(function (img) {
      img.closest('.photo-frame').setAttribute('tabindex', '0');
      img.closest('.photo-frame').setAttribute('role', 'button');
      img.closest('.photo-frame').setAttribute('aria-label', 'View larger photo: ' + img.alt);
      img.closest('.photo-frame').addEventListener('click', function () { openLightbox(img); });
      img.closest('.photo-frame').addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(img); }
      });
    });
    function openLightbox(img) {
      lightboxImg.src = img.currentSrc || img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add('open');
      lightboxClose.focus();
    }
    function closeLightbox() { lightbox.classList.remove('open'); }
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox || e.target === lightboxClose) closeLightbox();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeLightbox();
    });
  }

  /* ---------------------------------------------------------------------
     2.1 INTERACTIVE ELEMENTS — scroll-reveal animation using DOM
     manipulation (toggling a class) driven by IntersectionObserver.
     ------------------------------------------------------------------ */
  var revealEls = document.querySelectorAll('.card, blockquote');
  if ('IntersectionObserver' in window && revealEls.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(function (el) {
      el.classList.add('reveal');
      observer.observe(el);
    });
  }

  /* =====================================================================
     4. FORM FUNCTIONALITY AND VALIDATION
     ===================================================================== */

  var EMAIL_RECIPIENT = 'info@thompsonplumbing.co.za';
  var EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var PHONE_PATTERN = /^(\+27|0)[6-8][0-9]{8}$/; // South African mobile/landline format

  function fieldWrap(field) {
    return field.closest('.field') || field.parentElement;
  }

  function showError(field, message) {
    var wrap = fieldWrap(field);
    var errorEl = wrap.querySelector('.field-error');
    if (!errorEl) {
      errorEl = document.createElement('span');
      errorEl.className = 'field-error';
      wrap.appendChild(errorEl);
    }
    errorEl.textContent = message;
    field.setAttribute('aria-invalid', 'true');
  }

  function clearError(field) {
    var wrap = fieldWrap(field);
    var errorEl = wrap.querySelector('.field-error');
    if (errorEl) errorEl.textContent = '';
    field.removeAttribute('aria-invalid');
  }

  function validateField(field) {
    var value = field.value.trim();

    if (field.hasAttribute('required') && !value) {
      showError(field, 'This field is required.');
      return false;
    }
    if (field.type === 'email' && value && !EMAIL_PATTERN.test(value)) {
      showError(field, 'Enter a valid email address, e.g. name@example.com.');
      return false;
    }
    if (field.type === 'tel' && value && !PHONE_PATTERN.test(value.replace(/\s/g, ''))) {
      showError(field, 'Enter a valid South African number, e.g. 082 000 0000.');
      return false;
    }
    if (field.tagName === 'TEXTAREA' && value && value.length < 10) {
      showError(field, 'Please add a little more detail (at least 10 characters).');
      return false;
    }
    if (field.tagName === 'SELECT' && field.hasAttribute('required') && !value) {
      showError(field, 'Please choose an option.');
      return false;
    }
    clearError(field);
    return true;
  }

  function validateForm(form) {
    var valid = true;
    form.querySelectorAll('input, select, textarea').forEach(function (field) {
      if (field.type === 'file') return;
      if (!validateField(field)) valid = false;
    });
    return valid;
  }

  /**
   * 4.1 Client-side validation + "send as email" submission.
   * This is a static site with no backend, so form data is validated,
   * then compiled into an email addressed to EMAIL_RECIPIENT (the
   * recipient hard-coded in this file) and handed to the user's email
   * client via a mailto: link. The brief 700ms delay simulates the async
   * feedback an AJAX call to a real backend/email API (e.g. Formspree,
   * EmailJS) would give; swapping in a real fetch() POST to such a
   * service is a drop-in replacement for the setTimeout block below.
   */
  function wireForm(formId, buildSubject, buildBody) {
    var form = document.querySelector(formId);
    if (!form) return;

    form.querySelectorAll('input, select, textarea').forEach(function (field) {
      if (field.type === 'file') return;
      field.addEventListener('blur', function () { validateField(field); });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validateForm(form)) {
        var firstInvalid = form.querySelector('[aria-invalid="true"]');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      var submitBtn = form.querySelector('button[type="submit"]');
      var originalText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';

      window.setTimeout(function () {
        var data = new FormData(form);
        var subject = buildSubject(data);
        var body = buildBody(data);
        var mailto = 'mailto:' + EMAIL_RECIPIENT +
          '?subject=' + encodeURIComponent(subject) +
          '&body=' + encodeURIComponent(body);
        window.location.href = mailto;

        var success = form.parentElement.querySelector('.form-success');
        if (success) {
          success.style.display = 'block';
          success.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        form.reset();
      }, 700);
    });
  }

  // enquiries.html — quote-request form
  wireForm('#quote-form',
    function (d) { return 'Quote Request — ' + d.get('service'); },
    function (d) {
      return 'Name: ' + d.get('name') +
        '\nPhone: ' + d.get('phone') +
        '\nEmail: ' + d.get('email') +
        '\nJob type: ' + d.get('service') +
        '\nUrgency: ' + d.get('urgency') +
        '\n\nDetails:\n' + d.get('details');
    }
  );

  // contact.html — general message form
  wireForm('#contact-form',
    function (d) { return 'Website Message — ' + d.get('subject'); },
    function (d) {
      return 'Name: ' + d.get('name') +
        '\nEmail: ' + d.get('email') +
        '\nMessage type: ' + d.get('subject') +
        '\n\nMessage:\n' + d.get('message');
    }
  );

  /* ---------------------------------------------------------------------
     File upload label (enquiries.html)
     ------------------------------------------------------------------ */
  var fileDrop = document.querySelector('.file-drop');
  var fileInput = document.querySelector('#photo-upload');
  if (fileDrop && fileInput) {
    fileDrop.addEventListener('click', function () { fileInput.click(); });
    fileInput.addEventListener('change', function () {
      var label = fileDrop.querySelector('span');
      if (fileInput.files.length && label) {
        label.textContent = fileInput.files.length + ' file(s) selected';
      }
    });
  }
});