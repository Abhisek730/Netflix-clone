const show = document.getElementById("show");
const bannerTitle = document.getElementById("banner-title");
const bannerDescription = document.getElementById("banner-description");
const banner = document.getElementById('banner');
const nav = document.getElementById("nav");

// varibales for about section
const container = document.getElementById('container')
const title = document.getElementById("title");
const date = document.getElementById("date");
const language = document.getElementById("language");
const rating = document.getElementById("rating");
const close = document.getElementById("close");
const description = document.getElementById("description");



const API_KEY = "e64f3b3e26f432be01ccdbacadd96982";
const baseURL = "https://api.themoviedb.org/3";
const imageUrl = "https://image.tmdb.org/t/p/original/";

const requests = [
    `/discover/tv?api_key=${API_KEY}&with_networks=213`,
    `/trending/all/week?api_key=${API_KEY}&language=en-US`,
    `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
    `/discover/movie?api_key=${API_KEY}&with_genres=28`,
    `/discover/movie?api_key=${API_KEY}&with_genres=35`,
    `/discover/movie?api_key=${API_KEY}&with_genres=27`,
    `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
    `/discover/movie?api_key=${API_KEY}&with_genres=99`
]


async function fetchData() {
    for (let i = 0; i < 8; i++) {
        const response = await fetch(`${baseURL}${requests[i]}`);
        const data = await response.json()
        var movies = data.results;
        createRows(movies, i)
    }
    return movies;
}
fetchData();

function createRows(movies, i) {
    movies.map((movie) => {
        const imag = document.getElementById(`images${i}`)
        const poster = document.createElement("img");
        if (i > 0) {
            poster.src = `${imageUrl}${movie.backdrop_path}`;

        } else {
            poster.src = `${imageUrl}${movie.poster_path}`;
            poster.classList.add("imageLarge")
        }
        poster.classList.add("image")
        imag.appendChild(poster);
        poster.addEventListener("click", function () {
            container.style.display = "flex";
            const moviePosterImg = document.getElementById("moviePosterImg");
            moviePosterImg.src = `${imageUrl}${movie.poster_path}`;
            title.textContent = (movie?.title || movie?.name || movie?.original_name);
            date.textContent = movie.first_air_date;
            language.textContent = movie.original_language;
            rating.textContent = movie.vote_average;
            description.textContent = movie.overview;
        })
    })
}

async function fetchBannerData() {
    const bannerResponse = await fetch(`${baseURL}${requests[0]}`);
    const bannerData = await bannerResponse.json()
    var banners = bannerData.results;
    console.log(banners)
    var background = banners[Math.floor(Math.random() * banners.length)]
    console.log(background)
    banner.style.backgroundImage = `url(${imageUrl}${background?.backdrop_path})`;
    bannerTitle.textContent = background.name;
    bannerDescription.textContent = background.overview

}

fetchBannerData();


window.addEventListener("scroll", function () {
    if (window.scrollY > 100) {
        nav.classList.add('navBlack')
    } else {
        nav.classList.remove('navBlack')
    }
})

close.addEventListener("click", function () {
    container.style.display = "none";
})