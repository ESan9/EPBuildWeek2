import { callTheTower } from "./callTheTower.js";

const endpointFisso = "https://striveschool-api.herokuapp.com/api/deezer/";
const query = "search?q=";

const preferiti = localStorage.getItem("preferitiAlbum");

if (preferiti) {
  const arrayRecuperato = JSON.parse(preferiti);
  arrayRecuperato.forEach((element) => {
    callTheTower(endpointFisso, query, element).then((data) => {
      const divLib = document.getElementById("divLib");
      const collina = document.createElement("div");
      collina.innerHTML = `<div class="col-6 col-md-4 col-lg-3 mb-4">
          <a href="#" class="text-decoration-none">
            <div class="card h-100">
              <img
                src="${data.data[0].album.cover_xl}"
                alt="Titolo album"
                class="card-img-top" />
              <div class="card-body p-2">
                <h3 class="card-title">${data.data[0].artist.name}</h3>
              </div>
            </div>
          </a>
        </div>`;
      divLib.appendChild(collina);
      let id = "";
      collina.addEventListener("click", () => {
        callTheTower(endpointFisso, query, data.data[0].artist.name).then(
          (data) => {
            id = data.data[0].artist.id;
            window.location.href = `./artist.html?eventId=${id}`;
          }
        );
      });
    });
  });
} else {
  alert("Non ci sono preferiti salvati");
}
