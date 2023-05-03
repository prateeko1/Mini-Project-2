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
  container.innerHTML = ``;
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
var movieCategoryList;

document.addEventListener("DOMContentLoaded", function() {
  movieModal = new bootstrap.Modal(document.getElementById('movieModal'), {
    keyboard: false
  })
  fetch('./JSON/anime_des.json')
  .then(response => response.json())
  .then(data => {
    movieCategoryList = data;
    setUpMovies();
    setupCarousel();
  })
  .catch(error => console.log(error));
});  

function setUpMovies() {
  const newMovieListContainer = document.querySelector("#new+.movie-list-wrapper .movie-list");
  const actionMovieListContainer = document.querySelector("#AA+.movie-list-wrapper .movie-list");
  const romanceMovieListContainer = document.querySelector("#R+.movie-list-wrapper .movie-list");
  const upcomingMovieListContainer = document.querySelector("#WW+.movie-list-wrapper .movie-list");
  setupMovieList(newMovieListContainer, movieCategoryList.newReleases);
  setupMovieList(actionMovieListContainer, movieCategoryList.actions);
  setupMovieList(romanceMovieListContainer, movieCategoryList.romance);
  setupMovieList(upcomingMovieListContainer, movieCategoryList.upcoming);
}

function openModalPopup(data) {
  const videoURL = data.previousElementSibling.dataset.video;
  const description = data.previousElementSibling.innerText;
  const title = data.previousElementSibling.previousElementSibling.innerText;
  movieModal.toggle();
  document.querySelector(".movie-metadata h4").innerText = title;
  document.querySelector(".movie-metadata p").innerText = description;
  document.querySelector(".video-container video").src = videoURL;
  handleNestedVideos();
}


function handleNestedVideos() {
  let listVideo = document.querySelectorAll('.videolist .vid');
  let mainVideo = document.querySelector('.main_video video');
  let title = document.querySelectorAll('.main_video h4 p');

  listVideo.forEach(videoHTMLElem => (
    videoHTMLElem.addEventListener('click', function() {
      const videoURL = videoHTMLElem.querySelector("video").src
      mainVideo.src = videoURL;
    })
  ))
}

function search(e) {
  let searchTerm = e.target.value;
  if(!searchTerm || !searchTerm?.trim()?.length) {
    setUpMovies();
    return;
  }
  searchTerm = searchTerm.trim().toLowerCase()
  const newReleasesFilteredList = movieCategoryList.newReleases.filter(x=>x.title.toLowerCase().includes(searchTerm));
  const newMovieListContainer = document.querySelector("#new+.movie-list-wrapper .movie-list");
  setupMovieList(newMovieListContainer, newReleasesFilteredList);

  searchTerm = searchTerm.trim().toLowerCase()
  const newActionFilteredList = movieCategoryList.actions.filter(x=>x.title.toLowerCase().includes(searchTerm));
  const ActionMovieListContainer = document.querySelector("#AA+.movie-list-wrapper .movie-list");
  setupMovieList(ActionMovieListContainer, newActionFilteredList);

  searchTerm = searchTerm.trim().toLowerCase()
  const RomanceFilteredList = movieCategoryList.romance.filter(x=>x.title.toLowerCase().includes(searchTerm));
  const RomanceMovieListContainer = document.querySelector("#R+.movie-list-wrapper .movie-list");
  setupMovieList(RomanceMovieListContainer, RomanceFilteredList);
}
