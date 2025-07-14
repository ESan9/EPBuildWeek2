const endpointFisso = "https://striveschool-api.herokuapp.com/api/deezer/";
const query = "search?q=";
const key = "metallica"; //input.value
const obj = {};

const callTheTower = function (endpointFisso, query, key) {
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
      console.log(data);
    })
    .catch((error) => alert(error));
};

callTheTower(endpointFisso, query, key);
console.log(obj);

//cambia funzione con obj di ritorno!!!
