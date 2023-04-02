
const apiPoke = {}

convertPokeApiDetailToPokemon = (pokeDetail) =>{
    const pokemon = new Pokemon;
    
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types =  pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo =  pokeDetail.sprites.other.dream_world.front_default

    const moves = pokeDetail.moves.map((movesSlot) => movesSlot.move.name)
    const [move] = moves

    pokemon.moves = moves
    pokemon.move = move

    console.log(move)

    return pokemon

}

apiPoke.getPokemonDetail = (pokemon) =>{
    return fetch(pokemon.url)
            .then((response) => response.json()).then(convertPokeApiDetailToPokemon)
}

apiPoke.getPokemon = (offset = 0, limit = 20) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

    return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => pokemons.map(apiPoke.getPokemonDetail))
    .then((detailRequest) => Promise.all(detailRequest))
    .then((pokemonDetail) => pokemonDetail)
    .catch((error) => console.error(error))

}