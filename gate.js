(function () {
  const gate = document.getElementById("gate");
  if (!gate) return;

  // The gates open onto the site, not onto the cathedral. The cathedral is
  // reached from a link on the home page, so that everyone arriving here
  // passes through the site itself first.
  const INSIDE = "home.html";

  const COLS = 4;
  const ROWS = 2;
  const FRAMES = COLS * ROWS;

  function showFrame(i) {
    const x = (i % COLS) * (100 / (COLS - 1));
    const y = Math.floor(i / COLS) * (100 / (ROWS - 1));
    gate.style.backgroundPosition = x + "% " + y + "%";
  }

  let playing = false;
  function enter() {
    if (playing) return;
    playing = true;
    gate.parentNode.classList.add("opening");
    if (window.cathedralTrack) window.cathedralTrack("gate-entered");

    let i = 0;
    const timer = setInterval(function () {
      i += 1;
      if (i >= FRAMES) {
        clearInterval(timer);
        window.location.href = INSIDE;
        return;
      }
      showFrame(i);
    }, 110);
  }

  gate.addEventListener("click", enter);
})();
