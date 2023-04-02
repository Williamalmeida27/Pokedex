const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById("loadMoreButton");
const buttonModal = document.getElementById("buttonModal")
const bodyModal = document.getElementById("modalBody")
const maxRecords = 151;
const limit = 10;
let offset = 0;



loadPokemonItens = (offset, limit) => {
    apiPoke.getPokemon(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) => `
            <li class="pokemon ${pokemon.type}">
                <button type="button" class="btn" id="buttonModal" 
                data-bs-toggle="modal" data-bs-target="#detailPokemon">
                    <span class="number">#${pokemon.number}</span>
                    <span class="name">${pokemon.name}</span>

                    <div class="detail">
                        <ol class="types">
                            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}

                        </ol>

                        <img src="${pokemon.photo}"
                            alt="${pokemon.name}">
                    </div>
                </button>
            </li>

            <!-- Modal -->
            <div class="modal fade" id="detailPokemon" tabindex="-1" aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Detalhe do Pokemon</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <span>Name: ${pokemon.name}</span>
                            <span>Name: ${pokemon.number}</span>
                            <span>Name: ${pokemon.move}</span>
                        </div>
                        <div class="modal-footer">
                        </div>
                    </div>
                </div>
            </div>
            
        
        `).join('')
        pokemonList.innerHTML += newHtml
    })

};

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener('click', () => {
    offset += limit;
    const qtdRecordNextPage = offset + limit;

    if (qtdRecordNextPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)

    } else {
        loadPokemonItens(offset, limit)
    }

});

