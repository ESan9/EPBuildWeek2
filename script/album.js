//importo funzione
import { callTheTower } from "./callTheTower.js";

//recupera id
// const parameters = new URLSearchParams(location.search);
// const id = parameters.get("album");
const id = "256250622";

const endpointFisso = "https://striveschool-api.herokuapp.com/api/deezer/";
const query = "album/";
callTheTower(endpointFisso, query, id).then((data) => {
  //popola html

  const album = document.getElementById("album");
  album.innerText = data.title;

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
  array.forEach((element) => {
    trackContainer.innerHTML += ` <li
                class="d-flex justify-content-between align-items-center py-2 px-3"
              >
                <div class="d-flex align-items-center gap-3" style="width: 60%">
                  <span class="track-number text-light d-none d-lg-block"
                    >1</span
                  >
                  <div>
                    <h5 class="mb-0 text-white">${element.title_short}</h5>
                    <small class="text-white-50"
                      >${element.artist.name}</small
                    >
                  </div>
                </div>

                <div class="d-flex align-items-center" style="width: 40%">
                  <div
                    class="d-flex w-100 justify-content-between d-none d-lg-flex"
                  >
                    <small class="text-white-50 track-plays">${element.rank}</small>
                    <small class="text-white-50 track-duration">${element.duration}</small>
                  </div>

                  <i
                    class="bi bi-three-dots-vertical text-light d-lg-none ms-auto"
                  ></i>
                </div>
              </li>`;
  });
};
