import { callTheTower } from "./callTheTower.js";

//questo serve per cercare, chiamare API e recuperare id per spostarlo su Artist html
const endpointFisso = "https://striveschool-api.herokuapp.com/api/deezer/";
const query = "search?q=";
let id = "";

//funzione Vai a Cercati
const cerca = function (id) {
  window.location.href = `./artist.html?eventId=${id}`;
};

//funzione per lettera casuale
const letteraCasuale = () => {
  const lettere = "abcdefghijklmnopqrstuvwxyz";
  const indice = Math.floor(Math.random() * lettere.length);
  return lettere[indice] + lettere[indice - 1]; //perchè cosi almeno mette due lettere a cazzz
};
const randomId = letteraCasuale();
//questo serve per popolare l html di home
let num = 0;
const btnAvanti = document.getElementById("avanti");
btnAvanti.addEventListener("click", () => {
  num += 1;
  ennesimaFunzione();
});
const btnIndietro = document.getElementById("indietro");
btnIndietro.addEventListener("click", () => {
  num -= 1;
  ennesimaFunzione();
});

const ennesimaFunzione = () => {
  callTheTower(endpointFisso, query, randomId).then((data) => {
    // popola html

    const randomTitle = document.getElementById("random-title");
    randomTitle.innerText = data.data[0].artist.name;
    const randomSong = document.getElementById("random-artist");
    randomSong.innerText = data.data[num].title_short;
    const randomRank = document.getElementById("random-phrase");
    randomRank.innerText = `${data.data.length - 1} brani`;
    const randomImg = document.getElementById("random-img");
    randomImg.setAttribute("src", data.data[0].artist.picture);
  });
};
ennesimaFunzione();

//data.data[0].link sarebbe il link alla traccia
