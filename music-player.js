// multiple song music player by adilene @ adilene.net
// source: https://github.com/sayantanm19/js-music-player

let track_name = document.querySelector(".songtitle");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let track_index = 0;
let isPlaying = false;
let updateTimer;

let curr_track = document.getElementById("music");

// add more songs by adding another object with a name and path
// audio is hosted at archive.org/details/cc-music-player because Neocities
// free accounts reject .mp3 uploads -- paths must stay absolute
let track_list = [
  {
    name: "you want it darker - leonard cohen",
    path: "https://archive.org/download/cc-music-player/you-want-it-darker.mp3",
  },
  {
    name: "terrible angels - cocorosie",
    path: "https://archive.org/download/cc-music-player/terrible-angels.mp3",
  },
  {
    name: "i'm going to heaven - amigo the devil",
    path: "https://archive.org/download/cc-music-player/im-going-to-heaven.mp3",
  },
  {
    name: "profondo rosso - goblin",
    path: "https://archive.org/download/cc-music-player/profondo-rosso.mp3",
  },
];

function loadTrack(track_index) {
  clearInterval(updateTimer);
  resetValues();

  curr_track.src = track_list[track_index].path;
  curr_track.load();

  track_name.textContent = "track " + (track_index + 1) + ": " + track_list[track_index].name;

  updateTimer = setInterval(seekUpdate, 1000);

  curr_track.addEventListener("ended", nextTrack);
}

function resetValues() {
  curr_time.textContent = "0:00";
  total_duration.textContent = "0:00";
  seek_slider.value = 0;
}

function playpauseTrack() {
  if (!isPlaying) {
    if (window.cathedralTrack) window.cathedralTrack("music-played");
    playTrack();
  } else pauseTrack();
}

function playTrack() {
  curr_track.play();
  isPlaying = true;
  playpause_btn.textContent = "❚❚";
  playpause_btn.setAttribute("aria-label", "Pause");
  track_name.textContent = "track " + (track_index + 1) + ": " + track_list[track_index].name;
}

function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  playpause_btn.textContent = "▶";
  playpause_btn.setAttribute("aria-label", "Play");
}

function nextTrack() {
  if (track_index < track_list.length - 1) track_index += 1;
  else track_index = 0;
  loadTrack(track_index);
  playTrack();
}

function prevTrack() {
  if (track_index > 0) track_index -= 1;
  else track_index = track_list.length - 1;
  loadTrack(track_index);
  playTrack();
}

function seekTo() {
  let seekto = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seekto;
}

function seekUpdate() {
  let seekPosition = 0;

  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);
    seek_slider.value = seekPosition;

    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

    if (currentSeconds < 10) currentSeconds = "0" + currentSeconds;
    if (durationSeconds < 10) durationSeconds = "0" + durationSeconds;

    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}

prev_btn.addEventListener("click", prevTrack);
playpause_btn.addEventListener("click", playpauseTrack);
next_btn.addEventListener("click", nextTrack);
seek_slider.addEventListener("change", seekTo);

loadTrack(track_index);
track_name.textContent = "click play!! click play!! click play!! click play!!";
