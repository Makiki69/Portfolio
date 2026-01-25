// ===== Hero Slideshow + Smooth Nav =====
document.addEventListener("DOMContentLoaded", () => {
  const slides = Array.from(document.querySelectorAll(".hero-slideshow .slide"));
  if (!slides.length) return;

  let idx = 0;
  const DURATION = 7000; // ms between slides
  let timer = null;

  // Optional slide captions (leave "" to hide)
  const captions = [
   "Bioinformatics & Computational Biology",
  "NGS Analysis • RNA-seq • Variant Calling",
  "Biomedical Research • Engineering • Venture"
  ];

  // Create a caption element
  const hero = document.querySelector(".hero-slideshow");
  const cap = document.createElement("div");
  cap.className = "slide-caption";
  hero.appendChild(cap);

  function setActive(i){
    slides.forEach((s,k)=>s.classList.toggle("active", k===i));
    if (captions[i]) {
      cap.textContent = captions[i];
      cap.style.opacity = 1;
    } else {
      cap.style.opacity = 0;
    }
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

  // Pause on hover / touch for better UX
  hero.addEventListener("mouseenter", stop);
  hero.addEventListener("mouseleave", start);
  hero.addEventListener("touchstart", stop, { passive:true });
  hero.addEventListener("touchend", start, { passive:true });

  // Keyboard arrows for manual control
  window.addEventListener("keydown", (e)=>{
    if (e.key === "ArrowRight") { stop(); next(); }
    if (e.key === "ArrowLeft")  { stop(); idx = (idx - 1 + slides.length) % slides.length; setActive(idx); }
  });

  // Smooth internal nav (About/Projects/Venture/Contact)
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

