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








/* testimonial js code */
(function(){
  const list = document.getElementById('testiList');
  if(!list) return;

  const prev = document.getElementById('prevTesti');
  const next = document.getElementById('nextTesti');
  const controls = document.querySelector('.testi-controls');

  // show controls only in carousel mode
  const carouselMode = list.classList.contains('carousel-mode');
  if(carouselMode) controls.style.display = 'flex';

  // simple horizontal slide by container width
  const step = () => {
    // compute slide width (one card)
    const card = list.querySelector('.testi');
    return card ? card.getBoundingClientRect().width + parseFloat(getComputedStyle(list).gap || 0) : list.clientWidth;
  };

  prev?.addEventListener('click', () => {
    list.scrollBy({left: -step(), behavior: 'smooth'});
  });

  next?.addEventListener('click', () => {
    list.scrollBy({left: step(), behavior: 'smooth'});
  });

  // optional: enable swipe for touch
  let startX = 0, isDown = false;
  list.addEventListener('pointerdown', e => { isDown = true; startX = e.clientX; list.style.cursor='grabbing'; });
  list.addEventListener('pointerup', () => { isDown=false; list.style.cursor=''; });
  list.addEventListener('pointerleave', () => { isDown=false; list.style.cursor=''; });
  list.addEventListener('pointermove', e => {
    if(!isDown) return;
    list.scrollLeft -= (e.clientX - startX);
    startX = e.clientX;
  });
})();







/* footer section's js code */
document.addEventListener('DOMContentLoaded', () => {
  const y = document.getElementById('alt-footer-year');
  if (y) y.textContent = new Date().getFullYear();
});
