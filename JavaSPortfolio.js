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
