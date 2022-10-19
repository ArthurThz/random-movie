// Capturando os elementos do DOM
const activeMovie = document.querySelector('.disabled')
const btn = document.querySelector('.btn')
const movieBanner = document.querySelector('.movie-banner')
const movieName = document.querySelector('.movie-name')
const movieSynopsis = document.querySelector('.movie-synopsis')

// Retira a classe inicial "disabled" atribui uma nova classe "movie-content"
function changeClassMovie() {
    activeMovie.removeAttribute('class')
    activeMovie.setAttribute('class', 'movie-content')
}

// Executa o Fetch e captura os dados da API
async function getMovie() {
    //Chave da API
    const api_key = '85b751d676709f46fefd0898350cef22'

    //Array para captura da resposta do FETCH
    let catchArr = []

    //Array que armazena os indices do array catchArr
    let movies = [];

    //For utilizado para mudar o numero da página de pesquisa utilizada no FETCH, captura os dados da página 1 à 7
    for (let i = 1; i <= 7; i++) {
        //Realiza a solicitação do FETCH
        const response = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${api_key}&language=pt&page=${[i]}`).catch(err => console.log(err))
        //Armazena os dados resgatados do FETCH
        const getData = await response.json().catch(err => console.log(err))

        //Captura os dados e armazena no array
        catchArr.push(getData.results)

    }
    //Armazena os índices do catchArr que contém os filmes de cada página do FETCH
    movies.push(catchArr)

    //Função que realizará a manipulação dos dados e mostrará para o usuário
    function setMovieInfo() {
        //randomIndexArr gera um aleatório de 1 à 7 para percorrer o primeiro array
        let randomIndexArr = ~~(Math.random() * 7)
        // randomMovieArr percorre o array selecionado por randomIndexArr e captura o array que contem os dados de um filme
        let randomMovieArr = ~~(Math.random() * 20)
        //URL com o caminho para o diretório de imagens
        const posterURL = `https://www.themoviedb.org/t/p/w220_and_h330_face/`

        //Objeto que armazena todos os dados que serão mostrados
        const setMovieData = {
            //ID 
            id: movies[0][randomIndexArr][randomMovieArr].id,
            //TITULO ORIGINAL
            name: movies[0][randomIndexArr][randomMovieArr].original_title,
            //SINOPSE
            synopsis: movies[0][randomIndexArr][randomMovieArr].overview,
            //POSTER
            posterPath: `${posterURL}${movies[0][randomIndexArr][randomMovieArr].poster_path}`,
            //ANO DE LANÇAMENTO
            releaseDate: movies[0][randomIndexArr][randomMovieArr].release_date
        }
        //Mostra os dados do Objeto setMovieData no DOM dinamicamente
        //Poster do filme
        movieBanner.setAttribute('src', setMovieData.posterPath)
        //Titulo e ano de lançamento do filme
        movieName.innerHTML = `${setMovieData.name} <p>${setMovieData.releaseDate}</p>`
        //Sinopse do filme
        movieSynopsis.innerHTML = setMovieData.synopsis

        //Verifica se os dados são undefined ou Vazios
        function movieError() {
            //Caso todos os dados sejam undefined executará a função até retornar um valor válido
            if (setMovieData.name == undefined & setMovieData.synopsis == undefined & setMovieData.releaseDate == undefined) { getMovie() }

            //Caso algum dos valores sejam apenas vazios, retornará uma mensagem dizendo que o valor está indisponivel
            if (setMovieData.synopsis == '') {
                movieSynopsis.innerHTML = "Sinopse indisponível"
            }

            if (setMovieData.releaseDate == '') {
                movieName.innerHTML = `${setMovieData.name}<p>Ano de lançamento indisponível</p>`
            }

            if (setMovieData.name == '') {
                movieName.innerHTML = "Titulo indisponível"
            }
        }
        //Executa a função de busca de erros
        movieError()
    }
    //Executa a função que mostrará as informações do filme
    setMovieInfo()
}

// Ao clicar solicita um filme para a API
btn.addEventListener('click', () => {
    changeClassMovie()
    getMovie()

})