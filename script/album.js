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
  anno.innerText = data.release_date.slice(0, 4);

  const ntrack = document.getElementById("ntrack");
  ntrack.innerText = data.nb_tracks;

  const durata = document.getElementById("durata");
  //funzione per prendere tutte le data.tracks.data[i].duration e sommarle con reduce

  //   tracks
  //   data.tracks.data[i]
});

// const contaMin = (array)=> {
//     const newArray = []
//     array.forEach(element => {
//         newArray.push(element.duration)
//     });
//     newArray.reduce((acc, num) => acc + num)
// }
