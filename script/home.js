import { callTheTower } from "./callTheTower.js";

const input = document.getElementById("searchBar");
const searchNav = document.getElementById("searchNav");
const btnSearch = document.getElementById("btnSearch");
const searchForm = document.getElementById("searchForm");

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
    cerca(id);
  });
});

//funzione Vai a Cercati
const cerca = function (id) {
  window.location.href = `./artist.html?eventId=${id}`;
};

//questo serve per popolare l html di home
// callTheTower(endpointFisso, query, id).then((data) => {
//   // popola html
//   const randomTitle = document.getElementById("random-title");
//   randomTitle.innerText = data.title;
// });
