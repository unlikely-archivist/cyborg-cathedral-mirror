// Flies that wander the page and land for a few seconds at a time. Killing one
// does not get rid of it: two more come out of where it died, so the second
// swat leaves four, the third eight, and so on.
const SPRITE =
  "data:image/svg+xml," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
      <ellipse cx="5" cy="8" rx="4" ry="2.6" fill="#cdd4d6" opacity=".55"/>
      <ellipse cx="11" cy="8" rx="4" ry="2.6" fill="#cdd4d6" opacity=".55"/>
      <ellipse cx="8" cy="8" rx="3.4" ry="2.2" fill="#1a1614"/>
      <circle cx="11" cy="8" r="1.5" fill="#241c18"/>
    </svg>`,
  );

// Each kill doubles them, so this runs away fast: eight swats is 256 flies,
// each one its own animation frame. The ceiling is the only thing between
// chaos and a locked-up tab.
const SPAWN_PER_KILL = 2;
const MAX_FLIES = 120;
// How near a click has to land. The sprite is 14px, which is a mean target on
// something that will not hold still, so the whole page listens and the
// nearest fly inside this radius takes it.
const SWAT_RADIUS = 34;
// pixels per frame, so they fly in rather than teleport in
const TOP_SPEED = 7;

// somewhere just outside the viewport, on a random edge
function offEdge() {
  const m = 30;
  switch (Math.floor(Math.random() * 4)) {
    case 0: return [-m, Math.random() * innerHeight];
    case 1: return [innerWidth + m, Math.random() * innerHeight];
    case 2: return [Math.random() * innerWidth, -m];
    default: return [Math.random() * innerWidth, innerHeight + m];
  }
}

const portrait = document.querySelector(".profile-card-oval");
const flies = new Set();
let alive = 0;

function makeFly(startX, startY) {
  const fly = document.createElement("img");
  fly.className = "fly";
  fly.src = SPRITE;
  fly.alt = "";

  let x = startX;
  let y = startY;
  let targetX = x;
  let targetY = y;
  let restUntil = 0;
  let fallSpeed = 0;
  let dead = false;

  const self = {
    at: () => [x + 7, y + 7],
    kill() {
      if (dead) return;
      dead = true;
      flies.delete(self);
      if (window.cathedralTrack) window.cathedralTrack("fly-killed");
      // the body still drops, but the replacements come in off the edges of
      // the page the way the first one did
      for (let i = 0; i < SPAWN_PER_KILL; i++) {
        if (alive >= MAX_FLIES) break;
        const [ex, ey] = offEdge();
        makeFly(ex, ey);
      }
    },
  };

  // stay in a loose halo around her face, re-measured each time so it follows scroll
  function pickTarget() {
    const box = portrait.getBoundingClientRect();
    const cx = box.left + box.width / 2;
    const cy = box.top + box.height / 2;
    const angle = Math.random() * Math.PI * 2;
    const reach = box.width * (0.3 + Math.random() * 0.75);
    targetX = cx + Math.cos(angle) * reach;
    targetY = cy + Math.sin(angle) * reach * 0.8;
  }

  function step(now) {
    if (dead) {
      fallSpeed += 0.6;
      y += fallSpeed;
      fly.style.top = y + "px";
      fly.style.transform = `rotate(${180 + y}deg)`;
      if (y > innerHeight + 40) {
        alive -= 1;
        return fly.remove();
      }
      return requestAnimationFrame(step);
    }

    const dx = targetX - x;
    const dy = targetY - y;

    if (Math.hypot(dx, dy) < 6) {
      if (!restUntil) restUntil = now + 1500 + Math.random() * 4000;
      if (now > restUntil) {
        restUntil = 0;
        pickTarget();
      }
    } else {
      // ease toward the target, with a buzz so the path is never straight.
      // The step is capped, or one coming in from off the edge crosses the
      // whole page in three frames and reads as a streak, not a fly.
      const ease = Math.min(1, TOP_SPEED / (Math.hypot(dx, dy) * 0.035));
      x += dx * 0.035 * ease + (Math.random() - 0.5) * 3;
      y += dy * 0.035 * ease + (Math.random() - 0.5) * 3;
      fly.style.transform = `rotate(${(Math.atan2(dy, dx) * 180) / Math.PI + 90}deg)`;
    }

    fly.style.left = x + "px";
    fly.style.top = y + "px";
    requestAnimationFrame(step);
  }

  alive += 1;
  flies.add(self);
  document.body.appendChild(fly);
  pickTarget();
  requestAnimationFrame(step);
}

// Listening on the page rather than the sprite means a near miss still counts
// and, because nothing is cancelled here, a link under the fly still opens.
addEventListener("click", (e) => {
  let nearest = null;
  let best = SWAT_RADIUS;
  for (const f of flies) {
    const [fx, fy] = f.at();
    const d = Math.hypot(e.clientX - fx, e.clientY - fy);
    if (d < best) {
      best = d;
      nearest = f;
    }
  }
  if (nearest) nearest.kill();
});

// the first one enters from off the left edge
makeFly(-20, innerHeight * 0.4);
