// Variables
const API_KEY = '2e0164894030708af6f2405bcd24f074';
const API_URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}&page=1`;
const Search_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query="`;
const image_path = 'https://image.tmdb.org/t/p/w1280';

const mainEl = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

// Function: Get Movies from API
const getMovies = async (url) => {
    // fetch from api
    const response = await fetch(url);
    // convert data to json
    const data = await response.json();
    // display to UI
    showMovies(data.results);
};

// Function: Show movies to UI
const showMovies = (movies) => {
    // clear mainEl UI
    mainEl.innerHTML = '';

    movies.forEach((movie) => {
        // destructruing movie data
        const { title, poster_path, vote_average, overview } = movie;

        // image path
        let image;
        if (poster_path === null) {
            image = `/assets/images/no_image.png`;
        } else {
            image = image_path + poster_path;
        }

        // create new elment for movie
        const movieEl = document.createElement('div');

        // add classList
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
            <img src="${image}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRatings(
                    vote_average
                )}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                ${overview}
            </div>   
        `;

        // append movie to UI
        mainEl.appendChild(movieEl);
    });
};

// Function: Get class by ratings
const getClassByRatings = (rating) => {
    if (rating >= 8) {
        return 'green';
    } else if (rating >= 5) {
        return 'orange';
    } else {
        return 'red';
    }
};

// Event Listener: Search Movie
form.addEventListener('submit', (e) => {
    // prevent from submitting/default behavior
    e.preventDefault();
    // get search value
    const searchTerm = search.value;
    // check if searchTerm isn't empty
    if (searchTerm && searchTerm !== '') {
        // get movies with search term
        getMovies(Search_URL + searchTerm);
        // clear search
        search.value = '';
    } else {
        // reload page
        window.location.reload();
    }
});

// Get initial movies on page load
getMovies(API_URL);
