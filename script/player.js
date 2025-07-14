const audioSource = document.getElementById("audio-source");
const playPauseBtn = document.getElementById("play-pause-btn");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const progressBar = document.getElementById("progress-bar");
const currentTimeSpan = document.getElementById("current-time");
const durationSpan = document.getElementById("duration");
const volumeBar = document.getElementById("volume-bar");
const muteBtn = document.getElementById("mute-btn");
const trackTitleDisplay = document.getElementById("track-title");

const playlist = [
  { title: "Viola (feat. Salmo)", src: "audio/viola.mp3" },
  { title: "Song 2", src: "audio/song2.mp3" },
  { title: "Song 3", src: "audio/song3.mp3" },
];

let currentTrackIndex = 0;
let lastVolume = 100; // Per memorizzare il volume prima del mute

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
}

function loadTrack(index) {
  // Gestisce il looping della playlist
  if (index >= playlist.length) {
    index = 0;
  } else if (index < 0) {
    index = playlist.length - 1;
  }

  currentTrackIndex = index;
  audioSource.src = playlist[currentTrackIndex].src;
  if (trackTitleDisplay) {
    // Aggiorna il titolo della traccia
    trackTitleDisplay.textContent = playlist[currentTrackIndex].title;
  }
  audioSource.load(); // Carica la nuova traccia

  // Mantieni lo stato di riproduzione
  if (!audioSource.paused) {
    // Controlla lo stato attuale del player
    audioSource.play();
  } else {
    audioSource.pause();
  }
}

function updatePlayPauseButton() {
  playPauseBtn.textContent = audioSource.paused ? "⏯" : "⏸";
}

function updateMuteButton() {
  muteBtn.textContent = audioSource.volume === 0 ? "🔇" : "🔊";
}

playPauseBtn.addEventListener("click", () => {
  if (audioSource.paused) {
    audioSource.play();
  } else {
    audioSource.pause();
  }
});

audioSource.addEventListener("play", updatePlayPauseButton);
audioSource.addEventListener("pause", updatePlayPauseButton);

audioSource.addEventListener("loadedmetadata", () => {
  progressBar.max = audioSource.duration;
  durationSpan.textContent = formatTime(audioSource.duration);

  progressBar.value = audioSource.currentTime;
});

audioSource.addEventListener("timeupdate", () => {
  // Previene l'aggiornamento della barra di progresso se l'utente la sta trascinando
  if (!progressBar.dataset.dragging) {
    progressBar.value = audioSource.currentTime;
  }
  currentTimeSpan.textContent = formatTime(audioSource.currentTime);
});

progressBar.addEventListener("input", () => {
  // Imposta un flag per indicare che l'utente sta trascinando la barra
  progressBar.dataset.dragging = "true";
  audioSource.currentTime = progressBar.value;
  currentTimeSpan.textContent = formatTime(audioSource.currentTime); // Aggiorna il tempo durante il trascinamento
});

progressBar.addEventListener("change", () => {
  //'change' si attiva quando l'utente rilascia il mouse
  progressBar.dataset.dragging = ""; // Rimuove il flag di trascinamento
  audioSource.currentTime = progressBar.value;
  if (!audioSource.paused) {
    // Riprende la riproduzione se era in corso
    audioSource.play();
  }
});

volumeBar.addEventListener("input", () => {
  audioSource.volume = volumeBar.value / 100;
  lastVolume = volumeBar.value; // Aggiorna lastVolume anche durante ilcambio volume
  updateMuteButton();
});

muteBtn.addEventListener("click", () => {
  if (audioSource.volume === 0) {
    audioSource.volume = lastVolume / 100; // Ripristina volume
    volumeBar.value = lastVolume;
  } else {
    lastVolume = volumeBar.value; // Memorizza volume corrente
    audioSource.volume = 0;
    volumeBar.value = 0;
  }
  updateMuteButton();
});

audioSource.addEventListener("volumechange", updateMuteButton);

prevBtn.addEventListener("click", () => {
  loadTrack(currentTrackIndex - 1);
});

nextBtn.addEventListener("click", () => {
  loadTrack(currentTrackIndex + 1);
});

audioSource.addEventListener("ended", () => {
  loadTrack(currentTrackIndex + 1);
  // looping è già gestito da loadTrack
});

function initializePlayer() {
  loadTrack(currentTrackIndex); // Carica la traccia
  updatePlayPauseButton(); // Assicura che l'icona del pulsante sia corretta all'inizio
  updateMuteButton(); // Stessa cosa ma col muto
  volumeBar.value = audioSource.volume * 100; // Imposta la barra al valore corrente dell'audio
}

initializePlayer();
