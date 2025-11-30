
(function(){
  // Elements (must match your HTML)
  const btn = document.getElementById('sidebarToggle');        // the hamburger button
  const sidebar = document.querySelector('.sidebar');         // the aside.sidebar
  const nav = document.getElementById('sidebarNav');          // the <ul id="sidebarNav" class="nav">

  // Quick safety checks
  if (!btn) { console.error('Sidebar toggle button #sidebarToggle not found'); return; }
  if (!sidebar) { console.error('.sidebar element not found'); return; }
  if (!nav) { console.error('#sidebarNav element not found'); return; }

  // Ensure initial aria state
  btn.setAttribute('aria-expanded', String(sidebar.classList.contains('open')));

  // Helper to show/hide
  function showNav() {
    sidebar.classList.add('open');                      // allows CSS .sidebar.open .nav to apply
    nav.style.display = 'flex';                         // direct style fallback
    nav.style.flexDirection = 'column';
    btn.setAttribute('aria-expanded', 'true');
  }
  function hideNav() {
    sidebar.classList.remove('open');
    nav.style.display = 'none';
    btn.setAttribute('aria-expanded', 'false');
  }
  function toggleNav() {
    const isVisible = (getComputedStyle(nav).display !== 'none');
    if (isVisible) hideNav(); else showNav();
  }

  // Attach click
  btn.addEventListener('click', function(e){
    e.stopPropagation();
    toggleNav();
  });

  // Close when clicking outside (mobile overlay behavior)
  document.addEventListener('click', function(e){
    if (!sidebar.classList.contains('open')) return;
    if (sidebar.contains(e.target) || btn.contains(e.target)) return;
    hideNav();
  });

  // Close on Escape
  document.addEventListener('keydown', function(e){
    if (e.key === 'Escape') hideNav();
  });

  // Close after clicking a nav link (mobile)
  nav.addEventListener('click', function(e){
    const a = e.target.closest('a');
    if (!a) return;
    if (window.matchMedia('(max-width:768px)').matches) {
      setTimeout(hideNav, 120);
    }
  });

  // DEBUG helper: print current state when resizing (optional)
  window.addEventListener('resize', function(){
    // ensure hidden on desktop if you want nav visible on wide screens
    if (!window.matchMedia('(max-width:768px)').matches) {
      // cleanup mobile inline styles when switching back to desktop
      nav.style.display = '';
      sidebar.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    } else {
      // keep current inline style if user toggled
    }
  });
})();

