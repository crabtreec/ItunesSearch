let musicPlayer = document.querySelector(".music-player");
let searchForm = document.querySelector("form");
let container = document.querySelector(".results");
let searchText;
let html;
let currentSongPreview;

searchForm.addEventListener("submit", getSearch);
container.addEventListener("click", playSong);

function getSearch(event) {
  html = "";
  event.preventDefault();
  searchText = event.target.querySelector("input").value;
  event.target.querySelector("input").value = "";
  collectData(searchText);
};

function collectData(artist) {
  return fetch("https://itunes.apple.com/search?term=" + artist+ "&limit=15&media=music")
  .then (function(response){
    return response.json();
  }).then (function(data) {
    console.log(data);
    container.innerHTML = songsToDom(data);

  });
}

function songsToDom(songs) {
  html = `<h3>Search Results: Click a Song for a Preview</h3><br>`
  for (let i = 0; i < songs.results.length; i++) {
    let currentSong = songs.results[i];
    html += `
    <div class="song-container" id="${currentSong.trackName}" name="${currentSong.previewUrl}">
      <img src="${currentSong.artworkUrl100}"/>
      <h5>${currentSong.artistName}</h5>
      <h6>${currentSong.trackName}</h6>
    </div>
  `
  }
  return html;
}

function playSong() {
  let divClick;
  let divId;
  clickClass = event.target.getAttribute("class");
  if (clickClass !== "results") {
    if (clickClass === "song-container") {
      divClick = event.target;
    } else {
      divClick = event.target.parentElement;
    }
    divId = divClick.id;
    divUrl = divClick.getAttribute("name");
    musicPlayer.setAttribute("src", divUrl);
    console.log(divId);

  }

}
