const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=562ee8f23a8c20ab0fa2d4312262a7c4&'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="'

const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')
let page = 1
let movieList = []

form.addEventListener('submit', e => {
  e.preventDefault()
  const searchValue = search.value
  if (searchValue && searchValue !== '') {
    console.log(SEARCH_API + searchValue)
    getMovies(SEARCH_API + searchValue)
    search.value = ''
  }
})



document.addEventListener('DOMContentLoaded', e => {
  getMovies(API_URL + `&page=${page++}`)
  document.addEventListener('scroll', () => {
    const currentHeight = window.scrollY + window.innerHeight
    const documentHeight = document.body.scrollHeight
    if (currentHeight >= documentHeight) {
      getMovies(API_URL + `&page=${page++}`)
      console.log('at the bottom!')
    }
  })
})



async function getMovies(url) {
  const res = await fetch(url)
  const data = await res.json()
  if (url.includes('search')) {
    movieList = data.results
  } else {
    movieList.push(...data.results)
  }
  showMovies(movieList)
}


function showMovies(movies) {
  main.innerHTML = ''
  movies.forEach(movie => {
    const { title, vote_average, poster_path, overview } = movie
    const movieEl = document.createElement('div')
    movieEl.classList.add('movie')
    movieEl.innerHTML = `
    <img
        src="${IMG_PATH + poster_path}"
        alt="img">
      <div class="movie__info">
        <h3>${title}</h3>
        <span class=${getClassByRate(vote_average)}>${vote_average}</span>
      </div>
      <div class="movie__overview">
        <h3>Overview</h3>
        <p>${overview}</p>
      </div>
    </div>
    `

    main.appendChild(movieEl)
  })
}


function getClassByRate(vote) {
  if (vote >= 8) {
    return 'green'
  } else if (vote >= 5) {
    return 'orange'
  } else {
    return 'red'
  }
}