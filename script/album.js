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
    trackContainer.innerHTML += ` <li class="d-flex justify-content-between align-items-center">
                <div>
                  <h5 class="mb-0">${element.title_short}</h5>
                  <small class="text-muted">${element.artist.name}</small>
                </div>
                <i class="bi bi-three-dots-vertical text-light"></i>
              </li>`;
  });
};
