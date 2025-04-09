// Pegando os elementos do HTML que vão ser manipulados
const pokemonName = document.querySelector('.pokemon__name'); // Nome do Pokémon
const pokemonNumber = document.querySelector('.pokemon__number'); // Número do Pokémon (ID)
const pokemonImage = document.querySelector('.pokemon__image'); // Imagem do Pokémon

const form = document.querySelector('.form'); // Formulário de busca
const input = document.querySelector('.input__search'); // Campo de texto para digitar o nome ou número do Pokémon
const buttonPrev = document.querySelector('.btn-prev'); // Botão de Pokémon anterior
const buttonNext = document.querySelector('.btn-next'); // Botão de próximo Pokémon

// Variável que armazena o Pokémon atual (por padrão começa com o 1)
let searchPokemon = 1;

// Função assíncrona que faz a requisição (fetch) na API
const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`); // Faz a busca na API

  if (APIResponse.status === 200) { // Se a resposta for positiva (200 = OK)
    const data = await APIResponse.json(); // Transforma a resposta em JSON
    return data; // Retorna os dados do Pokémon
  }
}

// Função que renderiza o Pokémon na tela
const renderPokemon = async (pokemon) => {
  pokemonName.innerHTML = 'Loading...'; // Mostra 'Loading...' enquanto busca
  pokemonNumber.innerHTML = ''; // Limpa o número

  const data = await fetchPokemon(pokemon); // Busca os dados do Pokémon

  if (data) { // Se encontrou o Pokémon
    pokemonImage.style.display = 'block'; // Mostra a imagem
    pokemonName.innerHTML = data.name; // Mostra o nome do Pokémon
    pokemonNumber.innerHTML = data.id; // Mostra o número (ID)
    // Pega a imagem animada do Pokémon (da geração 5)
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    input.value = ''; // Limpa o input
    searchPokemon = data.id; // Atualiza o número do Pokémon atual
  } else { // Se não encontrou o Pokémon
    pokemonImage.style.display = 'none'; // Esconde a imagem
    pokemonName.innerHTML = 'Not found :c'; // Mostra mensagem de erro
    pokemonNumber.innerHTML = ''; // Limpa o número
  }
}

// Evento ao enviar o formulário (apertar enter ou buscar)
form.addEventListener('submit', (event) => {
  event.preventDefault(); // Impede o recarregamento da página
  renderPokemon(input.value.toLowerCase()); // Busca o Pokémon digitado (converte para minúsculo)
});

// Evento para o botão de Pokémon anterior
buttonPrev.addEventListener('click', () => {
  if (searchPokemon > 1) { // Garante que não vai buscar ID menor que 1
    searchPokemon -= 1; // Diminui 1
    renderPokemon(searchPokemon); // Busca o Pokémon anterior
  }
});

// Evento para o botão de próximo Pokémon
buttonNext.addEventListener('click', () => {
  searchPokemon += 1; // Aumenta 1
  renderPokemon(searchPokemon); // Busca o próximo Pokémon
});

// Mostra o primeiro Pokémon ao carregar a página
renderPokemon(searchPokemon);
