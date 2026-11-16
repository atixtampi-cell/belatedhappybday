const clock = document.getElementById("clock");
const pad = n => String(n).padStart(2, "0");
function updateClock() {
  const now = new Date();
  clock.textContent = `${pad(now.getHours())}:${pad(now.getMinutes())}`;
}
updateClock();
setInterval(updateClock, 10000);

// Open an app by double-clicking its desktop icon.
const windows = document.querySelectorAll(".app-window");
function openWindow(id) {
  windows.forEach(win => win.classList.add("hidden"));
  const target = document.getElementById(id);
  if (target) target.classList.remove("hidden");
  document.getElementById("start-menu").classList.add("hidden");
}
document.querySelectorAll(".desktop-icon").forEach(icon => {
  icon.addEventListener("dblclick", () => openWindow(icon.dataset.window));
});
document.querySelectorAll(".start-menu button").forEach(button => {
  button.addEventListener("click", () => openWindow(button.dataset.window));
});
document.querySelectorAll(".close-window").forEach(button => {
  button.addEventListener("click", () => button.closest(".app-window").classList.add("hidden"));
});

// Start menu
const startMenu = document.getElementById("start-menu");
document.getElementById("start-button").addEventListener("click", () => {
  startMenu.classList.toggle("hidden");
});

// Birthday song. Add your own permitted audio file as assets/song.mp3.
const audio = document.getElementById("birthday-audio");
const playButton = document.getElementById("play-button");
const songStatus = document.getElementById("song-status");
const record = document.querySelector(".record");
const progress = document.getElementById("progress");
playButton.addEventListener("click", async () => {
  if (audio.paused) {
    try {
      await audio.play();
      playButton.textContent = "Ⅱ Pause";
      songStatus.textContent = "now playing ♡";
      record.classList.add("playing");
    } catch {
      songStatus.textContent = "add assets/song.mp3 first ♡";
    }
  } else {
    audio.pause();
    playButton.textContent = "▶ Play";
    songStatus.textContent = "paused";
    record.classList.remove("playing");
  }
});
audio.addEventListener("timeupdate", () => {
  if (audio.duration) progress.style.width = `${(audio.currentTime / audio.duration) * 100}%`;
});
audio.addEventListener("ended", () => {
  playButton.textContent = "▶ Play";
  songStatus.textContent = "played with love ♡";
  record.classList.remove("playing");
});

// Tiny surprise
document.getElementById("reveal-button").addEventListener("click", () => {
  document.getElementById("hidden-reveal").classList.add("show");
  document.getElementById("reveal-button").textContent = "message unlocked ♡";
});

// Welcome toast
window.addEventListener("load", () => {
  const toast = document.getElementById("toast");
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2600);
});
