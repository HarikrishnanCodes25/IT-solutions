(function(){
  const h = document.getElementById('hamburger');
  const nav = document.querySelector('nav.navBar');
  if (!h || !nav) return;

  const setOpen = open => {
    nav.classList.toggle('active', !!open);
    h.setAttribute('aria-expanded', String(!!open));
    document.documentElement.classList.toggle('no-scroll', !!open);
    document.body.classList.toggle('no-scroll', !!open);
  };

  h.addEventListener('click', e => { e.stopPropagation(); setOpen(!nav.classList.contains('active')); });

  document.addEventListener('click', e => { if (!nav.contains(e.target) && !h.contains(e.target)) setOpen(false); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setOpen(false); });

  // close panel on link click (small delay)
  nav.addEventListener('click', e => {
    const link = e.target.closest('a');
    if (!link) return;
    // mobile: if clicking top-level dropdown trigger, toggle submenu
    const dropdownItem = e.target.closest('.dropdown');
    if (dropdownItem && window.matchMedia('(max-width:768px)').matches && e.target === dropdownItem.querySelector('a')) {
      e.preventDefault();
      dropdownItem.classList.toggle('expanded');
      const expanded = dropdownItem.classList.contains('expanded');
      dropdownItem.querySelector('a')?.setAttribute('aria-expanded', String(expanded));
      return;
    }
    setTimeout(()=> setOpen(false), 80);
  });
})();












/* multiple animation js code */
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
});

document.querySelectorAll("[data-animate]").forEach(el => observer.observe(el));









// Accessible accordion behavior for the Detailed Phase Breakdown.
// - Buttons (.acc-head) toggle their following .acc-body element.
// - Supports Enter/Space keyboard activation.
// - Uses aria-expanded and the hidden attribute for accessibility.

document.addEventListener('DOMContentLoaded', function () {
  const heads = Array.from(document.querySelectorAll('.acc-head'));

  function closeBody(button, body) {
    button.setAttribute('aria-expanded', 'false');
    body.hidden = true;
    const toggle = button.querySelector('.acc-toggle');
    if (toggle) toggle.textContent = '+';
  }

  function openBody(button, body) {
    button.setAttribute('aria-expanded', 'true');
    body.hidden = false;
    const toggle = button.querySelector('.acc-toggle');
    if (toggle) toggle.textContent = '−';
  }

  heads.forEach(head => {
    const body = head.nextElementSibling;
    if (!body) return;

    // Click toggles
    head.addEventListener('click', function () {
      const expanded = head.getAttribute('aria-expanded') === 'true';
      if (expanded) closeBody(head, body);
      else openBody(head, body);
    });

    // Keyboard support
    head.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        head.click();
      }
      // Optional: support Arrow Up/Down to navigate
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const next = head.parentElement.nextElementSibling;
        if (next) {
          const nextBtn = next.querySelector('.acc-head');
          if (nextBtn) nextBtn.focus();
        }
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        const prev = head.parentElement.previousElementSibling;
        if (prev) {
          const prevBtn = prev.querySelector('.acc-head');
          if (prevBtn) prevBtn.focus();
        }
      }
    });

    // Initialize (ensure aria + hidden consistency)
    const initExpanded = head.getAttribute('aria-expanded') === 'true';
    body.hidden = !initExpanded;
    const toggle = head.querySelector('.acc-toggle');
    if (toggle) toggle.textContent = initExpanded ? '−' : '+';
  });
});









/* footer section's js code */
document.addEventListener('DOMContentLoaded', () => {
  const y = document.getElementById('alt-footer-year');
  if (y) y.textContent = new Date().getFullYear();
});
