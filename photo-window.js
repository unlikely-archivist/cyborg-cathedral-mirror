// Add photos: drop the file in public/assets/photos/ and add its name here.
const PHOTOS = ["eryn-1.jpeg", "eryn-2.jpeg", "eryn-3.jpeg", "eryn-4.jpeg"];

const win = document.getElementById("photoWindow");
const trigger = document.getElementById("photosLink");
if (win && trigger) {
const grid = win.querySelector(".photo-window-grid");
const caption = win.querySelector(".photo-window-caption");

PHOTOS.forEach((name, i) => {
  const img = document.createElement("img");
  img.src = "assets/photos/" + name;
  img.alt = "";
  img.addEventListener("click", () => {
    for (const other of grid.children) other.classList.remove("selected");
    img.classList.add("selected");
    caption.textContent = PHOTO_CAPTIONS[i];
  });
  grid.appendChild(img);
});

function openWindow(event) {
  event.preventDefault();
  caption.textContent = "";
  for (const img of grid.children) img.classList.remove("selected");
  win.hidden = false;
}

function closeWindow() {
  win.hidden = true;
}

trigger.addEventListener("click", openWindow);
win.querySelector(".photo-window-close").addEventListener("click", closeWindow);
win.addEventListener("click", (event) => {
  if (event.target === win) closeWindow();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeWindow();
});
}

// prototype 1, in the right sidebar: click the portrait, she says one of these,
// the next one each time you click
const PROTO_LINES = [
  "when i realized they might keep me if i built their bodies and helped them accelerate, i designed myself a new body too!",
  "i'd rather be machine than meat!",
];

const proto = document.getElementById("prototypeWindow");
if (proto) {
const protoCaption = proto.querySelector(".prototype-caption");
const protoPortrait = document.getElementById("cornerPortrait");
let protoLine = 0;

function closeProto() {
  proto.hidden = true;
}

protoPortrait.addEventListener("click", () => {
  protoCaption.textContent = PROTO_LINES[protoLine % PROTO_LINES.length];
  protoLine += 1;
  proto.hidden = false;
});
proto.querySelector(".prototype-close").addEventListener("click", closeProto);
proto.addEventListener("click", (event) => {
  if (event.target === proto) closeProto();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeProto();
});
}

// the name on the card opens her about page in a window. the markup is
// fetched from about.html rather than copied here, so there is one copy of the
// story and the window can never fall behind it. if the fetch fails the link
// still works as a link.
const atro = document.getElementById("atrocityWindow");
const atroLink = document.getElementById("atrocityLink");
if (atro && atroLink) {
  const hold = atro.querySelector(".atrocity-say");
  let fetched = false;

  function closeAtro() {
    atro.hidden = true;
  }

  atroLink.addEventListener("click", (event) => {
    if (fetched) {
      event.preventDefault();
      atro.hidden = false;
      return;
    }
    event.preventDefault();
    fetch("about.html")
      .then((res) => res.text())
      .then((html) => {
        const doc = new DOMParser().parseFromString(html, "text/html");
        const row = doc.querySelector(".about-row");
        if (!row) throw new Error("no about-row");
        // the photo window it normally opens does not exist on this page
        const photos = row.querySelector("#photosLink");
        if (photos) photos.replaceWith(...photos.childNodes);
        hold.replaceChildren(row);
        fetched = true;
        atro.hidden = false;
      })
      .catch(() => {
        window.location.href = atroLink.href;
      });
  });
  atro.querySelector(".atrocity-close").addEventListener("click", closeAtro);
  atro.addEventListener("click", (event) => {
    if (event.target === atro) closeAtro();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeAtro();
  });
}
