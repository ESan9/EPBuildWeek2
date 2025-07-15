import { callTheTower } from "./callTheTower.js";

//recupera id
// const parameters = new URLSearchParams(location.search);
// const id = parameters.get("artist");
const id = "256250622";

const endpointFisso = "https://striveschool-api.herokuapp.com/api/deezer/";
const query = "artist/";
callTheTower(endpointFisso, query, id).then((data) => {
  // popola html
});
