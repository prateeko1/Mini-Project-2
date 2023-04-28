function setupCarousel() {
  const arrows = document.querySelectorAll(".arrow");
  const movieLists = document.querySelectorAll(".movie-list");

  arrows.forEach((arrow, i) => {
    const itemNumber = movieLists[i].querySelectorAll("img").length;
    let clickCounter = 0;
    arrow.addEventListener("click", () => {
      const ratio = Math.floor(window.innerWidth / 270);
      clickCounter++;
      if (itemNumber - (4 + clickCounter) + (4 - ratio) >= 0) {
        movieLists[i].style.transform = `translateX(${
          movieLists[i].computedStyleMap().get("transform")[0].x.value - 300
        }px)`;
      } else {
        movieLists[i].style.transform = "translateX(0)";
        clickCounter = 0;
      }
    });

    console.log(Math.floor(window.innerWidth / 270));
  });
}

function setupMovieList(container, movieList) {
  movieList.forEach((movie) => {
    container.innerHTML += `
    <div class="movie-list-item">
        <img class="movie-list-item-img" src="${movie.img}" alt="">
        <span class="movie-list-item-title">${movie.title}</span>
        <p class="movie-list-item-desc" data-video=${movie.video}>
          ${movie.description}
        </p>
        <button class="movie-list-item-button btn-sm" onclick="openModalPopup(this)">Watch</button>
    </div>
    `; 
  });
}

var movieModal;


document.addEventListener("DOMContentLoaded", function() {
  movieModal = new bootstrap.Modal(document.getElementById('movieModal'), {
    keyboard: false
  })
  fetch('./JSON/new-rel.json')
  .then(response => response.json())
  .then(data => {
    const newMovieListContainer = document.querySelector("#new+.movie-list-wrapper .movie-list");
    const actionMovieListContainer = document.querySelector("#AA+.movie-list-wrapper .movie-list");
    setupMovieList(newMovieListContainer, data.newReleases);
    setupMovieList(actionMovieListContainer, data.actions);
    setupCarousel();
  })
  .catch(error => console.log(error));
});  

function openModalPopup(data) {
  const videoURL = data.previousElementSibling.dataset.video;
  const description = data.previousElementSibling.innerText;
  const title = data.previousElementSibling.previousElementSibling.innerText;
  movieModal.toggle();
  document.querySelector(".movie-metadata h4").innerText = title;
  document.querySelector(".movie-metadata p").innerText = description;
  document.querySelector(".video-container video").src = videoURL;
}
