// import { callTheTower } from "./callTheTower.js";

//recupera id
const parameters = new URLSearchParams(location.search);
const id = parameters.get("eventId");

console.log(id);

// const endpointFisso = "https://striveschool-api.herokuapp.com/api/deezer/";
// const query = "artist/";
// callTheTower(endpointFisso, query, id).then((data) => {
//   const h1 = document.getElementById("title");
//   h1.innerText = data.name;
// });

//artist/{id}/albums per mostrare album
//artist/{id}/top?limit=5 per le top piu ascoltate
