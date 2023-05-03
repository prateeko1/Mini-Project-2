
let arr = [];
data.forEach(element => {
    let singleMovieObject = {
        img : element.querySelector(".movie-list-item-img").src,
        video : "",
        title : element.querySelector(".movie-list-item-title").innerText,
        description : element.querySelector(".movie-list-item-desc").innerText
    }
    arr.push(singleMovieObject)
});