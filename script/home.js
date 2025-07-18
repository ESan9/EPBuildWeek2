import { callTheTower } from "./callTheTower.js";
import { loadTrack } from "./player.js";

const input = document.getElementById("search-input");
const btnSearch = document.getElementById("search-button");
const iconHeart = document.getElementById("iconHeart");

btnSearch.addEventListener("click", () => {
  if (!input.value) return;
  callTheTower(endpointFisso, query, input.value).then((data) => {
    if (!data || !data.data || data.data.length === 0) return;
    id = data.data[0].artist.id;

    //implementa primi risutati
    cerca(id);
  });
});

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    btnSearch.click();
  }
});

// dropdown tempo reale
const searchResultsContainer = document.getElementById("search-results");

input.addEventListener("input", () => {
  const searchTerm = input.value.trim();
  if (searchTerm.length === 0) {
    searchResultsContainer.innerHTML = "";
    searchResultsContainer.style.display = "none";
    return;
  }

  callTheTower(endpointFisso, query, searchTerm).then((data) => {
    if (!data || !data.data || data.data.length === 0) {
      searchResultsContainer.innerHTML =
        "<div class='dropdown-item'>Nessun risultato</div>";
      searchResultsContainer.style.display = "block";
      return;
    }

    const itemsHtml = data.data
      .map(
        (item) => `
      <div class="dropdown-item" data-artist-id="${item.artist.id}">
        ${item.title_short} - ${item.artist.name}
      </div>
    `
      )
      .join("");

    searchResultsContainer.innerHTML = itemsHtml;
    searchResultsContainer.style.display = "block";

    const dropdownItems =
      searchResultsContainer.querySelectorAll(".dropdown-item");
    dropdownItems.forEach((item) => {
      item.addEventListener("click", () => {
        const artistId = item.getAttribute("data-artist-id");
        if (artistId) {
          window.location.href = `./artist.html?eventId=${artistId}`;
        }
      });
    });
  });
});

document.addEventListener("click", (event) => {
  if (
    !searchResultsContainer.contains(event.target) &&
    event.target !== input
  ) {
    searchResultsContainer.style.display = "none";
  }
});

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
  // per indice negativo
  const secondoIndice = indice > 0 ? indice - 1 : lettere.length - 1;
  return lettere[indice] + lettere[secondoIndice];
};
const randomId = letteraCasuale();

//serve per popolare html di home
let num = 0;

const btnAvanti = document.getElementById("avanti");
btnAvanti.addEventListener("click", () => {
  num += 1;
  iconHeart.classList.remove("bg-success");
  ennesimaFunzione();

  if (typeof goToNextOrPreviousTrack === "function") {
    goToNextOrPreviousTrack(1);
  }

  updateCarouselImage(num);
});
const btnIndietro = document.getElementById("indietro");
btnIndietro.addEventListener("click", () => {
  num -= 1;
  iconHeart.classList.remove("bg-success");
  ennesimaFunzione();

  if (typeof goToNextOrPreviousTrack === "function") {
    goToNextOrPreviousTrack(-1);
  }

  updateCarouselImage(num);
});

function updateCarouselImage(index) {
  const randomImg = document.getElementById("random-img");
  if (randomImg && Array.isArray(currentPlaylist) && currentPlaylist[index]) {
    randomImg.setAttribute("src", currentPlaylist[index].album.cover_small);
  }
}

let currentPlaylist = [];

//  click Salva
const clickCuore = () => {
  let preferitiAlbum = [];
  if (localStorage.getItem("preferitiAlbum")) {
    preferitiAlbum = JSON.parse(localStorage.getItem("preferitiAlbum"));
  }

  // usa l'id
  const currentTrackId = document.getElementById("random-artist");
  const nomeCanzone = currentTrackId.textContent;

  if (!nomeCanzone) {
    console.error("ID traccia non trovato");
    return;
  }

  const albumPrefe = preferitiAlbum.includes(nomeCanzone);
  if (albumPrefe) {
    preferitiAlbum = preferitiAlbum.filter(
      (albumId) => albumId !== nomeCanzone
    );
    iconHeart.classList.remove("bg-success");
  } else {
    preferitiAlbum.push(nomeCanzone);
    iconHeart.classList.add("bg-success");
  }
  localStorage.setItem("preferitiAlbum", JSON.stringify(preferitiAlbum));
};

import { onTrackChange } from "./player.js";

const ennesimaFunzione = () => {
  callTheTower(endpointFisso, query, randomId).then((data) => {
    // popola html
    const randomTitle = document.getElementById("random-title");
    randomTitle.innerText = data.data[0].artist.name;

    const randomSong = document.getElementById("random-artist");
    randomSong.innerText = data.data[num].title_short;
    // salva l'ID
    randomSong.dataset.trackId = data.data[num].id;

    const randomRank = document.getElementById("random-phrase");
    randomRank.innerText = `${data.data.length - 1} brani`;
    const randomImg = document.getElementById("random-img");
    randomImg.setAttribute("src", data.data[0].artist.picture_xl);

    //Salva PER AGG ad ArrayPrefe -> salva in local storage
    iconHeart.removeEventListener("click", clickCuore);
    iconHeart.addEventListener("click", clickCuore);

    if (typeof setPlaylist === "function") {
      const playlist = data.data.map((track) => ({
        title: track.title_short,
        src: track.preview,
        album: { cover_small: track.album.cover_small },
        artist: {
          name: track.artist.name,
          picture_small: track.artist.picture_small,
        },
      }));
      setPlaylist(playlist);
    }

    const playButton = document.getElementById("playPlayer");
    playButton.onclick = () => {
      const track = {
        title: data.data[num].title_short,
        src: data.data[num].preview,
        album: { cover_small: data.data[num].album.cover_small },
        artist: {
          name: data.data[num].artist.name,
          picture_small: data.data[num].artist.picture_small,
        },
      };
      if (typeof loadTrack === "function") {
        loadTrack(track, num, true);
      } else {
        console.error("loadTrack function is not available.");
      }
    };

    randomSong.onclick = () => {
      const track = {
        title: data.data[num].title_short,
        src: data.data[num].preview,
        album: { cover_small: data.data[num].album.cover_small },
        artist: {
          name: data.data[num].artist.name,
          picture_small: data.data[num].artist.picture_small,
        },
      };
      if (typeof loadTrack === "function") {
        loadTrack(track, num, true);
      } else {
        console.error("loadTrack function is not available.");
      }
    };
  });
};

ennesimaFunzione();

//album
const id1 = "212369";
const id2 = "127402";
const id3 = "110512";
const query4 = "album/";

const albumCard = document.getElementById("albumCard"); // la row
const popolaAlbum = (id) => {
  callTheTower(endpointFisso, query4, id).then((data) => {
    //popola html
    const col = document.createElement("div");
    col.classList.add(
      "col-2",
      "bg-dark",
      "d-flex",
      "justify-content-center",
      "align-items-center",
      "rounded-2"
    );
    col.setAttribute("style", "cursor:pointer");
    col.innerHTML = `<div
                  class="card border-0 bg-transparent w-75 mt-2"
                  style="width: 18rem">
                  <img
                    src="${data.cover_xl}"
                    class="card-img-top"
                    alt="logo album" />
                  <div class="card-body">
                    <h5 class="card-title text-white fs-6">${data.title}</h5>
                  </div>
                </div>`;

    col.addEventListener("click", () => {
      window.location.href = `./album.html?eventId=${id}`;
    });
    albumCard.appendChild(col);
  });
};

popolaAlbum(id1);
popolaAlbum(id2);
popolaAlbum(id3);
