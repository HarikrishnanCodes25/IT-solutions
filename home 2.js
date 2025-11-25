(function(){
  const h = document.getElementById('hamburger');
  const nav = document.querySelector('.navBar');
  const links = nav?.querySelector('.navLinks');
  if (!h || !nav || !links) return;

  const setOpen = open => {
    nav.classList.toggle('open', !!open);
    h.setAttribute('aria-expanded', String(!!open));
    document.documentElement.classList.toggle('no-scroll', !!open);
    document.body.classList.toggle('no-scroll', !!open);
  };

  h.addEventListener('click', e => { e.stopPropagation(); setOpen(!nav.classList.contains('open')); });

  document.addEventListener('click', e => {
    if (!nav.contains(e.target) && !h.contains(e.target)) setOpen(false);
  });

  document.addEventListener('keydown', e => { if (e.key === 'Escape') setOpen(false); });

  nav.addEventListener('click', e => { if (e.target.closest('a')) setOpen(false); });

  window.addEventListener('resize', () => { if (window.innerWidth > 768) setOpen(false); });
})();








// document.getElementById('year').textContent = new Date().getFullYear();
