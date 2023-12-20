let term = "";

const updateTerm = () => {
  const term = document.getElementById("searchTerm").value;

  const url = `https://itunes.apple.com/search?term=${term}&entity=song`;

  const songContainer = document.getElementById("songs");
  const loadingScreen = document.getElementById("loadingScreen");
  loadingScreen.style.display = "flex";

  songContainer.innerHTML = "";

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const artists = data.results;

      if (artists.length === 0) {
        alert("No results found!");
      } else {
        artists.forEach((result) => {
          const container = document.createElement("container");
          const artistsElement = document.createElement("p");
          const songElement = document.createElement("p");
          const imgElement = document.createElement("img");

          artistsElement.innerHTML = `<span class='label'>ARTIST</span><br><br>${truncateText(
            result.artistName,
            35
          )}`;

          songElement.innerHTML = `<span class='label'>TRACK</span> <br><br>${truncateText(
            result.trackName,
            50
          )}`;
          imgElement.src = result.artworkUrl100;

          container.appendChild(songElement);
          container.appendChild(artistsElement);
          container.appendChild(imgElement);

          songContainer.appendChild(container);
        });
      }
    })
    .catch((error) => {
      console.log("Request failed:", error);
    })
    .finally(() => {
      loadingScreen.style.display = "none";
    });
};

function truncateText(text, maxLength) {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
}

const searchTermInput = document.getElementById("searchTerm");
searchTermInput.addEventListener("keyup", updateTerm);
