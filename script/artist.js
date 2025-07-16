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

  fetch(endpointFisso + "artist/" + id + "/top?limit=5")
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
//artist/{id}/top?limit=5 per le top piu ascoltate
