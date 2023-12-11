const BASEURL = 'https://pokeapi.co/api/v2/pokemon/'
const BASEURLIMG = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"

const pokemonName = document.querySelector('.pokemon_name')
const pokemonNumber = document.querySelector('.pokemon_number')
const pokemonImg = document.querySelector('.pokemon_img')

const form = document.querySelector('.form')
const input = document.querySelector('.input_search')
const buttonVoltar = document.querySelector('.voltar')
const buttonProximo = document.querySelector('.proximo')
const buttonCapturar = document.querySelector('.capturar')

const img = document.querySelector('img')
const el = document.querySelector('span')
const el2 = document.querySelector('span')

let searchPokemon = 1

//Procura Pokémon na API
const fetchPokemon = async (pokemon) => {
//'await' é apenas para funções assíncronas, e o 'async' define a função como tal.
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
  
    if (APIResponse.status === 200) {
      const data = await APIResponse.json();
      return data;
    }
  }

//Mostra os dados encontrados do Pokémon
const showPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Procurando...'
    pokemonNumber.innerHTML = ''

    const data = await fetchPokemon(pokemon);

    if (data) {
      pokemonImg.style.display = 'block'
      pokemonName.innerHTML = data.name
      pokemonNumber.innerHTML = data.id
      pokemonImg.src = data['sprites']['versions']['generation-v']['black-white']
      ['animated']['front_default']
      input.value = ''
      searchPokemon = data.id
    } else {
        pokemonImg.style.display = 'none'
        pokemonName.innerHTML = 'Não encontrado'
        pokemonNumber.innerHTML = ''
        input.value = ''
    }
}

//Pega os dados inseridos no formulario para fazer a procura do Pokémon
form.addEventListener('submit', (event) => {
  event.preventDefault()
  showPokemon(input.value.toLowerCase())
})

buttonVoltar.addEventListener('click', () => {
  if (searchPokemon > 1){
    searchPokemon -= 1
    showPokemon(searchPokemon)
  }
  
})

buttonProximo.addEventListener('click', () => {
  searchPokemon += 1
  showPokemon(searchPokemon)
})

showPokemon(searchPokemon)

//Segunda parte: Mostrar os capturados.
buttonCapturar.addEventListener('click', () => {

  const imgSrc = pokemonImg.src

  const Capturados = document.querySelector('.capturados')
  const ul = document.querySelector('.pokemon-list')
  const li = document.querySelector('.liPokemon')
  ul.appendChild(li)

  const el = document.createElement('span')
  el.innerHTML = pokemonNumber.innerHTML + '-'
  const el2 = document.createElement('span')
  el2.innerHTML = pokemonName.innerHTML + '<br>'
  const img = document.createElement('sprite')
  img.innerHTML = '<img src="${pokemonImg.src}">' + '<br>'

  li.appendChild(el)
  li.appendChild(el2)
  li.appendChild(img)
  
})

//Terceira parte: Exibir os Pokémons, com o limite de 251
function showPokemonList(){
  let listaPokemons = []
  fetch(BASEURL + '?limit=251').then( Response => {
      if (Response.status == 200){
          listaPokemons = Response.json().then( json => {json.results.map( pokemon => { 
              let liPokemon = document.createElement("ul")
              let liPokemonImg = document.createElement("img")
              fetch(pokemon.url).then(Response => { pokemonIMG = Response.json().then( (pokemon) => {(liPokemonImg.src = pokemon.sprites.front_default)})})
              liPokemon.innerHTML = pokemon.name
              liPokemon.appendChild(liPokemonImg)
              document.getElementById("listaPokemons").appendChild(liPokemon)
          })
          return json})
          return listaPokemons
      }
  })
}

showPokemonList()
