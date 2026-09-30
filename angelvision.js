// The angelvision popup: not a boxed dialog, just the winged TV art with its
// screen cut out. Click a wing to change the channel; the wing you clicked
// twitches.
(function () {
  const openBtn = document.getElementById("angelvisionOpen");
  const closeBtn = document.getElementById("angelvisionClose");
  const win = document.getElementById("angelvisionWindow");
  const gif = document.getElementById("angelvisionGif");
  const bees = document.getElementById("angelvisionBees");
  const ufo = document.getElementById("angelvisionUfo");
  const bees2 = document.getElementById("angelvisionBees2");
  const ants = document.getElementById("angelvisionAnts");
  const wingLeft = document.getElementById("angelvisionWingLeft");
  const wingRight = document.getElementById("angelvisionWingRight");
  if (!openBtn || !win || !gif) return;

  const CHANNELS = [gif, bees, ufo, bees2, ants];
  let channel = 0;

  function showChannel(n) {
    channel = (n + CHANNELS.length) % CHANNELS.length;
    CHANNELS.forEach((el, i) => el.classList.toggle("active", i === channel));
  }

  function twitch(btn) {
    btn.classList.remove("twitch");
    // restart the animation even if it's still mid-flap from a fast click
    void btn.offsetWidth;
    btn.classList.add("twitch");
  }

  function open() {
    win.hidden = false;
    showChannel(0);
  }

  function close() {
    win.hidden = true;
  }

  openBtn.addEventListener("click", open);
  closeBtn?.addEventListener("click", close);
  // anything that isn't the tv or a wing counts as clicking away
  win.addEventListener("click", (e) => {
    if (!e.target.closest(".angelvision-tv-art, .angelvision-screen, .angelvision-wing")) close();
  });
  addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !win.hidden) close();
  });

  wingLeft?.addEventListener("click", () => {
    twitch(wingLeft);
    showChannel(channel - 1);
  });
  wingRight?.addEventListener("click", () => {
    twitch(wingRight);
    showChannel(channel + 1);
  });
})();
