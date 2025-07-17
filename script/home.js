import { callTheTower } from "./callTheTower.js";

const input = document.getElementById("searchBar");
const searchNav = document.getElementById("searchNav");
const btnSearch = document.getElementById("btnSearch");
const searchForm = document.getElementById("searchForm");
const iconHeart = document.getElementById("iconHeart");

btnSearch.addEventListener("click", () => {
  searchNav.classList.toggle("d-none");
});

//questo serve per cercare, chiamare API e recuperare id per spostarlo su Artist html
const endpointFisso = "https://striveschool-api.herokuapp.com/api/deezer/";
const query = "search?q=";
let id = "";
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  callTheTower(endpointFisso, query, input.value).then((data) => {
    id = data.data[0].artist.id;

    //implementa primi risutati
    cerca(id);
  });
});

//funzione Vai a Cercati
const cerca = function (id) {
  window.location.href = `./artist.html?eventId=${id}`;
};

//funzione per lettera casuale
const letteraCasuale = () => {
  const lettere = "abcdefghijklmnopqrstuvwxyz";
  const indice = Math.floor(Math.random() * lettere.length);
  // per indice negativo
  const secondoIndice = indice > 0 ? indice - 1 : lettere.length - 1;
  return lettere[indice] + lettere[secondoIndice];
};
const randomId = letteraCasuale();

//serve per popolare html di home
let num = 0;

const btnAvanti = document.getElementById("avanti");
btnAvanti.addEventListener("click", () => {
  num += 1;
  iconHeart.classList.remove("bg-success");
  ennesimaFunzione();
});
const btnIndietro = document.getElementById("indietro");
btnIndietro.addEventListener("click", () => {
  num -= 1;
  iconHeart.classList.remove("bg-success");
  ennesimaFunzione();
});

//  click Salva
const clickCuore = () => {
  let preferitiAlbum = [];
  if (localStorage.getItem("preferitiAlbum")) {
    preferitiAlbum = JSON.parse(localStorage.getItem("preferitiAlbum"));
  }

  // usa l'id
  const currentTrackId =
    document.getElementById("random-artist").dataset.trackId;

  if (!currentTrackId) {
    console.error("ID traccia non trovato");
    return;
  }

  const albumPrefe = preferitiAlbum.includes(currentTrackId);
  if (albumPrefe) {
    preferitiAlbum = preferitiAlbum.filter(
      (albumId) => albumId !== currentTrackId
    );
    iconHeart.classList.remove("bg-success");
  } else {
    preferitiAlbum.push(currentTrackId);
    iconHeart.classList.add("bg-success");
  }
  localStorage.setItem("preferitiAlbum", JSON.stringify(preferitiAlbum));
};

const ennesimaFunzione = () => {
  callTheTower(endpointFisso, query, randomId).then((data) => {
    // popola html
    const randomTitle = document.getElementById("random-title");
    randomTitle.innerText = data.data[0].artist.name;

    const randomSong = document.getElementById("random-artist");
    randomSong.innerText = data.data[num].title_short;
    // salva l'ID
    randomSong.dataset.trackId = data.data[num].id;

    const randomRank = document.getElementById("random-phrase");
    randomRank.innerText = `${data.data.length - 1} brani`;
    const randomImg = document.getElementById("random-img");
    randomImg.setAttribute("src", data.data[0].artist.picture);

    //Salva PER AGG ad ArrayPrefe -> salva in local storage
    iconHeart.removeEventListener("click", clickCuore);
    iconHeart.addEventListener("click", clickCuore);
  });
};

ennesimaFunzione();

// PLAYER
const btnPlayPlayer = document.getElementById("playPlayer");
const playerContainer = document.getElementById("player-container");
const playerCover = document.getElementById("player-cover");
const playerTitle = document.getElementById("player-title");
const playerArtist = document.getElementById("player-artist");
const playerAudio = document.getElementById("player-audio");
const playerPlayPause = document.getElementById("player-play-pause");
const btnStop = document.getElementById("player-stop");
const volumeSlider = document.getElementById("player-volume");
const progressBar = document.getElementById("progress-bar");
const currentTimeDisplay = document.getElementById("current-time");
const durationDisplay = document.getElementById("duration");

function formatTime(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  return `${min}:${sec < 10 ? "0" : ""}${sec}`;
}

// Volume iniziale
playerAudio.volume = volumeSlider.value;

btnPlayPlayer.addEventListener("click", () => {
  callTheTower(endpointFisso, query, randomId).then((data) => {
    if (!data || !data.data || data.data.length === 0) return;
    const track = data.data[num];

    playerCover.src = track.album.cover_small || "";
    playerTitle.innerText = track.title_short || "Titolo sconosciuto";
    playerArtist.innerText = track.artist.name || "Artista sconosciuto";
    playerAudio.src = track.preview || "";

    playerContainer.style.display = "flex";
    playerAudio.play();
    playerPlayPause.innerHTML = '<i class="fas fa-pause"></i>';
  });
});

playerPlayPause.addEventListener("click", () => {
  if (playerAudio.paused) {
    playerAudio.play();
    playerPlayPause.innerHTML = '<i class="fas fa-pause"></i>';
  } else {
    playerAudio.pause();
    playerPlayPause.innerHTML = '<i class="fas fa-play"></i>';
  }
});

btnStop.addEventListener("click", () => {
  playerAudio.pause();
  playerAudio.currentTime = 0;
  playerPlayPause.innerHTML = '<i class="fas fa-play"></i>';
});

volumeSlider.addEventListener("input", () => {
  playerAudio.volume = volumeSlider.value;
});

playerAudio.addEventListener("ended", () => {
  playerPlayPause.innerHTML = '<i class="fas fa-play"></i>';
});
// Imposta la durata
playerAudio.addEventListener("loadedmetadata", () => {
  progressBar.max = Math.floor(playerAudio.duration);
  durationDisplay.innerText = formatTime(playerAudio.duration);
  currentTimeDisplay.innerText = "0:00";
});

// Aggiorna progress bar
playerAudio.addEventListener("timeupdate", () => {
  if (!progressBar.dataset.dragging) {
    progressBar.value = Math.floor(playerAudio.currentTime);
    currentTimeDisplay.innerText = formatTime(playerAudio.currentTime);
  }
});

//  seek
progressBar.addEventListener("input", () => {
  progressBar.dataset.dragging = "true";
});

progressBar.addEventListener("change", () => {
  playerAudio.currentTime = progressBar.value;
  progressBar.dataset.dragging = "";
});

// FINE PLAYER

//data.data[0].link sarebbe il link alla traccia

//album
const id1 = "212369";
const id2 = "127402";
const id3 = "110512";
const query4 = "album/";

const albumCard = document.getElementById("albumCard"); // la row
const popolaAlbum = (id) => {
  callTheTower(endpointFisso, query4, id).then((data) => {
    //popola html
    const col = document.createElement("div");
    col.classList.add(
      "col-2",
      "bg-dark",
      "d-flex",
      "justify-content-center",
      "align-items-center",
      "rounded-2"
    );
    col.setAttribute("style", "cursor:pointer");
    col.innerHTML = `<div
                  class="card border-0 bg-transparent w-75 mt-2"
                  style="width: 18rem">
                  <img
                    src="${data.cover}"
                    class="card-img-top"
                    alt="logo album" />
                  <div class="card-body">
                    <h5 class="card-title text-white">${data.title}</h5>
                  </div>
                </div>`;

    col.addEventListener("click", () => {
      window.location.href = `./album.html?eventId=${id}`;
    });
    albumCard.appendChild(col);
  });
};

popolaAlbum(id1);
popolaAlbum(id2);
popolaAlbum(id3);
