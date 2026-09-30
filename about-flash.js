// The about photo cuts to the axe shot for a moment, then back. Same outfit,
// so it reads as one story rather than two pictures.
(function () {
  const flip = document.querySelector(".photo-flip");
  if (!flip) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  function schedule() {
    setTimeout(function () {
      flip.classList.add("flash");
      setTimeout(function () {
        flip.classList.remove("flash");
        schedule();
      }, 700);
    }, 5000 + Math.random() * 7000);
  }

  schedule();
})();
