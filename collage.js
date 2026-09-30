// Moodboard hotspots. Clicking a piece of the collage opens it zoomed.
//
// TO WRITE: replace each line below with what you want said about that piece.
// The key is the crop filename; the text is what shows under the image.
// Crops and hotspots both come from tools/make-collage-crops.py — edit the
// regions there, not here, if a hotspot is in the wrong place.
// Notes are empty for now — add a line per piece when you want them.
const NOTES = {};

const TITLES = {
  "wire-portrait": "eating wires",
  "flesh-rots": "flesh rots,",
  "crt-angels": "the eyes of angels in the pixels",
  "all-watched": "all watched over by machines of loving grace",
  "hacker-meat": "a pathetic creature of meat and bone",
  "circuit-cross": "the circuit board cross",
  "password-gag": "new password: flesh",
  "decay-diagram": "flesh, decay, machine, divine",
  "hummingbird": "the circuit hummingbird",
  "circle-diagram": "holy & divine, machine & code",
  "cyborg-jaw": "the jaw",
};

const win = document.getElementById("piece");
const image = document.getElementById("pieceImage");
const title = document.getElementById("pieceTitle");
const note = document.getElementById("pieceNote");
let lastSpot = null;

function openPiece(spot) {
  const slug = spot.dataset.piece;
  lastSpot = spot;
  image.src = "assets/collage/" + slug + ".jpg";
  image.alt = TITLES[slug];
  title.textContent = TITLES[slug];
  const text = NOTES[slug] || "";
  note.textContent = text;
  note.hidden = !text;
  win.hidden = false;
  win.querySelector(".photo-window-close").focus();
}

function closePiece() {
  win.hidden = true;
  if (lastSpot) lastSpot.focus();
}

for (const spot of document.querySelectorAll(".collagespot")) {
  spot.addEventListener("click", () => openPiece(spot));
}

win.querySelector(".photo-window-close").addEventListener("click", closePiece);
win.addEventListener("click", (event) => {
  if (event.target === win) closePiece();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !win.hidden) closePiece();
});
