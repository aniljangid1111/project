const apiUrl = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const key = `04c35731a5ee918f014970082a0088b1`;
const movieNAme = document.querySelector('.movieNAme');
const movieImg = document.querySelector('#movieImg');
const imgPath = "https://image.tmdb.org/t/p/w1280";
const searchApi = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";
const moviess=document.querySelector('.movies')
const movieSection = document.querySelector('.movies-section');

const getMovie = async (api) => {
    const response = await fetch(api)
    const data = await response.json()
    // console.log(data)
    showMovies(data.results)
}

const showMovies = (data) => {
    movieSection.innerHTML="";
    data.forEach((item) => {
        // console.log(item)
        const box = document.createElement("div")
        box.classList.add('movies-section')
        box.innerHTML = `
                 <div class="movies">
                    <div id="movieImg"><img src="${imgPath + item.poster_path}" alt=""></div>
                    <h4 class="movieNAme">${item.original_title}</h4>
                </div>
        
        `;
        movieSection.appendChild(box)
    })
}

document.querySelector('.search-bar').addEventListener('keyup',function(event){
    if(event.target.value !=""){
        getMovie(searchApi + event.target.value)
    }
    else{
        getMovie(apiUrl);
    }
    // console.log(event)
})

getMovie(apiUrl);