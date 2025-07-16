import { callTheTower } from "./callTheTower.js";

const parameters = new URLSearchParams(location.search);
const id = parameters.get("eventId");

const endpointFisso = "https://striveschool-api.herokuapp.com/api/deezer/";
const query = "artist/";

callTheTower(endpointFisso, query, id).then((data) => {
  document.getElementById("title").innerText = data.name;
  document.getElementById(
    "nbFan"
  ).innerText = `${data.nb_fan} ascoltatori mensili`;
  document.getElementById(
    "imgContainer"
  ).style.backgroundImage = `url('${data.picture_big}')`;

  fetch(endpointFisso + query + id + "/top?limit=50")
    .then((response) => response.json())
    .then((trackData) => {
      const sectionTrack = document.getElementById("trackContainer");

      trackData.data.forEach((track) => {
        const trackDiv = document.createElement("li");
        trackDiv.classList.add(
          "track-item",
          "mb-1",
          "d-flex",
          "align-items-center",
          "gap-3",
          "w-100"
        );

        const audio = document.createElement("audio");
        audio.src = track.preview;
        audio.preload = "none";

        const playButton = document.createElement("button");
        playButton.className = "btn btn-outline-light play-btn";
        playButton.innerHTML = `<i class="bi bi-play-fill"></i> Play`;
        playButton.addEventListener("click", () => {
          if (audio.paused) {
            audio.play();
            playButton.innerHTML = `<i class="bi bi-pause-fill"></i> Pause`;
          } else {
            audio.pause();
            playButton.innerHTML = `<i class="bi bi-play-fill"></i> Play`;
          }
        });

        audio.addEventListener("ended", () => {
          playButton.innerHTML = `<i class="bi bi-play-fill"></i> Play`;
        });

        const title = document.createElement("p");
        title.className = "mb-0 flex-grow-1";
        title.textContent = track.title;

        const rank = document.createElement("p");
        rank.className = "mb-0";
        rank.textContent = `${track.rank}`;

        const duration = document.createElement("p");
        duration.className = "mb-0";

        // convertiti sec in min ----> GRAZIE GOOGLE
        const minutes = Math.floor(track.duration / 60);
        const seconds = track.duration % 60;
        duration.textContent = `${minutes}:${seconds
          .toString()
          .padStart(2, "0")}`;

        trackDiv.appendChild(playButton);
        trackDiv.appendChild(title);
        trackDiv.appendChild(rank);
        trackDiv.appendChild(duration);
        trackDiv.appendChild(audio);

        sectionTrack.appendChild(trackDiv);
      });
    })
    .catch((err) => console.error("Errore nel recupero dei brani:", err));
});

//artist/{id}/albums per mostrare album
//artist/{id}/top?limit=50 per le top piu ascoltate

//funzione Vai a Cercati
const cerca = function (id3) {
  window.location.href = `./artist.html?eventId=${id3}`;
};

const input = document.getElementById("searchBar");
const searchForm = document.getElementById("searchForm");
//search bar
const query3 = "search?q=";
let id3 = "";
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  callTheTower(endpointFisso, query3, input.value).then((data) => {
    id3 = data.data[0].artist.id;
    cerca(id3);
  });
});
