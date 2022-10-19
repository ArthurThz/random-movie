
`https://www.themoviedb.org/t/p/w220_and_h330_face/${movies[0][randomIndexArr][n].poster_path}`

async function testeAPI(){
    const btn = document.querySelector('.btn')
    const movieBanner = document.querySelector('.movie-banner')
    const movieName = document.querySelector('.movie-name')
    const movieSynopsis = document.querySelector('.movie-synopsis')
    const api_key = '85b751d676709f46fefd0898350cef22'
    let movies = [];
    let catchArr =[]

    for(let i = 1; i <= 3;i++){
        const response = await  fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${api_key}&language=pt&page=${[i]}`)
        const getData = await response.json()
        catchArr.push(getData.results)
        
    }
  

    movies.push(catchArr)
  

    let randomIndexArr = ~~(Math.random() * 3)
    let n = ~~(Math.random() * 20)
    console.log(randomIndexArr)
    console.log(n)
    console.log(movies[0][randomIndexArr][n])
   
    const movieInfo =  {
        id:'',
        name:'',
        synopsis:'',
        poster:'',
        releaseDate:''
        
    }
 
   
    movieInfo.id = movies[0][randomIndexArr][n].id
    movieInfo.name = movies[0][randomIndexArr][n].original_title
    movieInfo.synopsis = movies[0][randomIndexArr][n].overview
    movieInfo.poster = `https://www.themoviedb.org/t/p/w220_and_h330_face/${movies[0][randomIndexArr][n].poster_path}`
    movieInfo.releaseDate = movies[0][randomIndexArr][n].release_date

    movieBanner.setAttribute('src',movieInfo.poster)
    movieName.innerHTML = `${movieInfo.name} <p>${movieInfo.releaseDate}</p>`
    movieSynopsis.innerHTML = movieInfo.synopsis
    

}

    btn.addEventListener('click',()=>{
        testeAPI()
    })
    


