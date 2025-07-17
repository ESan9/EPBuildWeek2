//importo funzione
import { callTheTower } from "./callTheTower.js";

//recupera id
const parameters = new URLSearchParams(location.search);
const id = parameters.get("eventId");

const endpointFisso = "https://striveschool-api.herokuapp.com/api/deezer/";
const query = "album/";
callTheTower(endpointFisso, query, id).then((data) => {
  //popola html
  document.getElementById("imgAlbum").setAttribute("src", data.cover_xl);
  document.getElementById("album").innerText = data.title;

  const nomeGruppo = document.getElementById("nomeGruppo");
  nomeGruppo.innerText = data.artist.name;

  const anno = document.getElementById("anno");
  anno.innerText = "• " + data.release_date.slice(0, 4);

  const ntrack = document.getElementById("ntrack");
  ntrack.innerText = "• " + data.nb_tracks + " " + "brani";

  const durata = document.getElementById("durata");
  //funzione per prendere tutte le data.tracks.data[i].duration e sommarle con reduce
  durata.innerText = Math.ceil(contaMin(data.tracks.data) / 60) + ` min`;

  //   tracks
  //   data.tracks.data[i] funzione per ciclare le track
  const trackContainer = document.getElementById("trackContainer");
  ciclaTrack(data.tracks.data);
});

const contaMin = (array) => {
  return array
    .map((element) => element.duration)
    .reduce((acc, num) => acc + num, 0);
};

const ciclaTrack = (array) => {
  array.forEach((element, index) => {
    // audio
    const audio = document.createElement("audio");
    audio.src = element.preview;
    audio.preload = "none";

    // btn audio
    const playButton = document.createElement("button");
    playButton.className = "btn btn-outline-light play-btn play-button me-2";
    playButton.innerHTML = `<i class="bi bi-play-fill"></i>`;

    playButton.addEventListener("click", () => {
      if (audio.paused) {
        audio.play();
        playButton.innerHTML = `<i class="bi bi-pause-fill"></i>`;
      } else {
        audio.pause();
        playButton.innerHTML = `<i class="bi bi-play-fill"></i>`;
      }
    });

    // fine audio
    audio.addEventListener("ended", () => {
      playButton.innerHTML = `<i class="bi bi-play-fill"></i>`;
    });

    //secondi a min
    const minutes = Math.floor(element.duration / 60);
    const seconds = element.duration % 60;
    const formattedSeconds = seconds < 10 ? "0" + seconds : seconds;

    // li
    const listItem = document.createElement("li");
    listItem.className =
      "d-flex justify-content-between align-items-center py-2 px-3";
    listItem.innerHTML = `
      <div class="d-flex align-items-center gap-3" style="width: 60%">
        
        <div>
          <h5 class="mb-0 text-white">${element.title_short}</h5>
          <small class="text-white-50">${element.artist.name}</small>
        </div>
      </div>

      <div class="d-flex align-items-center" style="width: 40%">
        <div class="d-flex w-100 justify-content-between d-none d-lg-flex">
          <small class="text-white-50 track-plays">${element.rank}</small>
          <small class="text-white-50 track-duration">${minutes}:${formattedSeconds}</small>
        </div>
        <i class="bi bi-three-dots-vertical text-light d-lg-none ms-auto"></i>
      </div>
    `;

    const trackInfo = listItem.querySelector(
      ".d-flex.align-items-center.gap-3"
    );
    trackInfo.insertBefore(playButton, trackInfo.firstChild);

    trackContainer.appendChild(listItem);
  });
};

//ICONA CUORE PER AGG ad ArrayPrefe -> salva in local storage
const iconHeart = document.getElementById("iconHeart");
iconHeart.addEventListener("click", () => {
  const nomeGruppo = document.getElementById("nomeGruppo").textContent;
  let preferitiAlbum = [];
  if (localStorage.getItem("preferitiAlbum")) {
    preferitiAlbum = JSON.parse(localStorage.getItem("preferitiAlbum"));
  }
  const albumPrefe = preferitiAlbum.includes(nomeGruppo);

  if (albumPrefe) {
    preferitiAlbum = preferitiAlbum.filter((albumId) => albumId !== nomeGruppo);
    iconHeart.classList.remove("bi-heart-fill");
    iconHeart.classList.add("bi-heart");
  } else {
    preferitiAlbum.push(nomeGruppo);
    iconHeart.classList.remove("bi-heart");
    iconHeart.classList.add("bi-heart-fill");
  }
  localStorage.setItem("preferitiAlbum", JSON.stringify(preferitiAlbum));
});

//per cercare anche da qui
const input = document.getElementById("searchBar");
const searchForm = document.getElementById("searchForm");

//questo serve per cercare, chiamare API e recuperare id per spostarlo su Artist html
const endpointFisso2 = "https://striveschool-api.herokuapp.com/api/deezer/";
const query2 = "search?q=";
let id2 = "";
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  callTheTower(endpointFisso2, query2, input.value).then((data) => {
    id2 = data.data[0].artist.id;
    cerca(id2);
  });
});

//funzione Vai a Cercati
const cerca = function (id2) {
  window.location.href = `./artist.html?eventId=${id2}`;
};
