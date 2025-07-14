const aHome = document.getElementById("home");
aHome.setAttribute("href", "./home.html");

//importo funzione
import { callTheTower } from "./callTheTower.js";

//recupera id
const parameters = new URLSearchParams(location.search);
const id = parameters.get("album");

const endpointFisso = "https://striveschool-api.herokuapp.com/api/deezer/";
const query = "album/";

const obj = {};
callTheTower(endpointFisso, query, id);

//popola html
