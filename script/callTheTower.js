const endpointFisso = "https://striveschool-api.herokuapp.com/api/deezer/";
const query = "search?q=";
const key = "metallica"; //input.value
const obj = {};

export const callTheTower = function (endpointFisso, query, key) {
  return fetch(endpointFisso + query + key)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(
          `Houston abbiamo un problema! Codice: ${response.status}`
        );
      }
    })
    .catch((error) => alert(error));
};

console.log(obj);
