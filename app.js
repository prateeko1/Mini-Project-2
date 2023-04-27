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

var movieModal;

document.addEventListener("DOMContentLoaded", function() {
  movieModal = new bootstrap.Modal(document.getElementById('movieModal'), {
    keyboard: false
  })
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
