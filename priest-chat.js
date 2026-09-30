// The priest in the sidebar. The cross on his head is dead when you arrive and
// lights one step further for each of the three things you do - read
// scripture, play the music, confess - in any order: off, red, white, green.
// Green means he will speak to you: click him.
//
// Clicking him then throws the password across the whole screen in flashing
// red for three seconds. The story itself is told inside the cathedral, once
// the password has been said at the gate.
const LIGHTS = [
  "assets/cathedral/boxhead-priest-static.png",
  "assets/cathedral/boxhead-priest-red.gif",
  "assets/cathedral/boxhead-priest-white.gif",
  "assets/cathedral/boxhead-priest-green.gif",
];

const DEEDS = ["cc-priest-read", "cc-priest-played", "cc-priest-confessed"];

// Before the cross is green he only nags. One nag per thing you have not done
// yet, in the order below, a different one each click - so a thing you have
// finished stops being asked about. With nothing done at all he says nothing.
const NAGS = [
  ["cc-priest-read", "have you read your scripture?"],
  ["cc-priest-confessed", "have you made a confession?"],
  ["cc-priest-played", "have you listened to a hymn?"],
];

const priestFigure = document.querySelector(".priest-figure");
const priestWindow = document.getElementById("priestWindow");

if (priestFigure && priestWindow) {
  let nagAt = 0;
  let flashing = null;

  // ?tester=1 puts this browser straight to a green cross, for checking the
  // far end of the sequence without doing all three things again
  if (new URLSearchParams(location.search).get("tester") === "1") {
    DEEDS.forEach((k) => localStorage.setItem(k, "1"));
  }

  function done() {
    return DEEDS.filter((k) => localStorage.getItem(k) === "1").length;
  }

  function show() {
    const step = done();
    priestFigure.src = LIGHTS[step];
    priestFigure.title = step === 3 ? "speak to him" : "ask him";
    priestFigure.classList.toggle("priest-figure--awake", step === 3);
    if (step < 3) priestWindow.hidden = true;
  }

  function deed(key) {
    if (localStorage.getItem(key) === "1") return;
    localStorage.setItem(key, "1");
    show();
  }

  function nag() {
    const left = NAGS.filter(([k]) => localStorage.getItem(k) !== "1");
    const old = priestFigure.parentNode.querySelector(".priest-hint");
    if (old) old.remove();
    const hint = document.createElement("p");
    hint.className = "priest-hint";
    hint.textContent = left.length === 3 ? "..." : left[nagAt % left.length][1];
    nagAt += 1;
    priestFigure.parentNode.appendChild(hint);
    setTimeout(() => hint.remove(), 3500);
  }

  function open() {
    if (done() < 3) {
      nag();
      return;
    }
    priestWindow.hidden = false;
    clearTimeout(flashing);
    flashing = setTimeout(() => {
      priestWindow.hidden = true;
    }, 3000);
  }

  const music = document.getElementById("music");
  if (music) music.addEventListener("play", () => deed("cc-priest-played"));

  const pulpit = document.getElementById("pulpitButton");
  if (pulpit) pulpit.addEventListener("click", () => deed("cc-priest-read"));

  document.addEventListener("cc-confessed", () => deed("cc-priest-confessed"));

  show();

  priestFigure.addEventListener("click", open);
}
