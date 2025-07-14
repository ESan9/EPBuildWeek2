const endpointFisso = "https://striveschool-api.herokuapp.com/api/deezer/";
const query = "search?q=";
const key = "metallica"; //input.value
const obj = {};

export const callTheTower = function (endpointFisso, query, key) {
  fetch(endpointFisso + query + key)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(
          `Houston abbiamo un problema! Codice: ${response.status}`
        );
      }
    })
    .then((data) => {
      Object.assign(obj, data); // la chiamata rimanda indietro un OBJ con ALL'INTERNO un array (obj.data = array)
    })
    .catch((error) => alert(error));
};

console.log(obj);

//ricorda di salvare in una costante obj il risultato della funzione
