#PokeDex



    

    loadPokemonDetails = (offset, limit) => {
    apiPoke.getPokemon(offset, limit).then((pokemons = []) => {
        const newDetail = pokemons.map((pokemon) => `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>

                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}

                    </ol>

                    <img src="${pokemon.photo}"
                        alt="${pokemon.name}">
                </div>
        </li>        
        `).join('')
        bodyModal.innerHTML += newDetail
    })
}