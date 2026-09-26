// ===== Hero Slideshow + Smooth Nav =====
document.addEventListener("DOMContentLoaded", () => {
  const slides = Array.from(document.querySelectorAll(".hero-slideshow .slide"));
  const captions = Array.from(document.querySelectorAll(".slide-caption"));
  const hero = document.querySelector(".hero-slideshow");

  if (!slides.length || !captions.length) return;

  let idx = 0;
  const DURATION = 7000; // ms between slides
  let timer = null;

  function setActive(i){
    slides.forEach((s,k)=>s.classList.toggle("active", k===i));
    captions.forEach((c,k)=>{
      c.style.opacity = (k === i ? 1 : 0);
    });
  }

  function next(){
    idx = (idx + 1) % slides.length;
    setActive(idx);
  }

  function start(){
    stop();
    timer = setInterval(next, DURATION);
  }

  function stop(){
    if (timer) clearInterval(timer);
    timer = null;
  }

  // Init
  setActive(idx);
  start();

  // Pause on hover / touch
  hero.addEventListener("mouseenter", stop);
  hero.addEventListener("mouseleave", start);
  hero.addEventListener("touchstart", stop, { passive:true });
  hero.addEventListener("touchend", start, { passive:true });

  // Keyboard arrows
  window.addEventListener("keydown", (e)=>{
    if (e.key === "ArrowRight") { stop(); next(); }
    if (e.key === "ArrowLeft")  { stop(); idx = (idx - 1 + slides.length) % slides.length; setActive(idx); }
  });

  // Smooth internal nav
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener("click", (e)=>{
      const id = a.getAttribute("href");
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({behavior:"smooth", block:"start"});
    });
  });
});

// ===== Project Slideshow (Secondary) =====
document.addEventListener("DOMContentLoaded", () => {
  const pSlides = Array.from(document.querySelectorAll(".project-slideshow .p-slide"));
  const pContainer = document.querySelector(".project-slideshow");

  if (!pSlides.length || !pContainer) return;

  let pIdx = 0;
  const P_DURATION = 3500;
  let pTimer = null;

  function setProjectActive(i){
    pSlides.forEach((s,k)=>s.classList.toggle("active", k===i));
  }

  function pNext(){
    pIdx = (pIdx + 1) % pSlides.length;
    setProjectActive(pIdx);
  }

  function pStart(){
    pStop();
    pTimer = setInterval(pNext, P_DURATION);
  }

  function pStop(){
    if (pTimer) clearInterval(pTimer);
    pTimer = null;
  }

  // Init
  setProjectActive(pIdx);
  pStart();

  // Pause on hover / touch
  pContainer.addEventListener("mouseenter", pStop);
  pContainer.addEventListener("mouseleave", pStart);
  pContainer.addEventListener("touchstart", pStop, { passive:true });
  pContainer.addEventListener("touchend", pStart, { passive:true });

  // Keyboard arrows (same UX as hero slideshow)
  window.addEventListener("keydown", (e)=>{
    if (e.key === "ArrowRight") { pStop(); pNext(); }
    if (e.key === "ArrowLeft")  { pStop(); pIdx = (pIdx - 1 + pSlides.length) % pSlides.length; setProjectActive(pIdx); }
  });
});
