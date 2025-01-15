var pokemonListDiv = $("#pokemonList");
var searchBox = $("#searchBox");
var searchBoxGen = $("#searchBoxGen");
var searchBoxType = $("#searchBoxType");
var currentPage = 1;
var rowsPerPage = 25;
var totalPages = 0;

searchBox.on('input', function (e) {
    displayPokemon(searchBox.val(), searchBoxGen.val(), searchBoxType.val(), 1);
});

searchBoxGen.on('input', function (e) {
    displayPokemon(searchBox.val(), searchBoxGen.val(), searchBoxType.val(), 1);
});

searchBoxType.on('input', function (e) {
    displayPokemon(searchBox.val(), searchBoxGen.val(), searchBoxType.val(), 1);
});

$("#prevPage").on('click', function (e) {
    if (currentPage > 1) {
        currentPage--;
        displayPokemon(searchBox.val(), searchBoxGen.val(), searchBoxType.val(), currentPage);
    }
});

$("#nextPage").on('click', function (e) {
    if (currentPage < totalPages) {
        currentPage++;
        displayPokemon(searchBox.val(), searchBoxGen.val(), searchBoxType.val(), currentPage);
    }
});

var pokemonData = {}; 
var rowTemplate = '<tr><td>%pokemonId%</td><td><img src="../webp/sprites/%pokemonIdPadded%MS.webp" /> <br />%pokemonName%</td></tr>';

function displayPokemon(searchString, searchGen, searchType, page) {
    var stringInName = searchString || "";
    var stringGen = searchGen || "";
    var stringType = searchType || "";
    currentPage = page || 1;

    var nodes = [];
    var startIndex = (currentPage - 1) * rowsPerPage;
    var endIndex = startIndex + rowsPerPage;

    var filteredPokemon = Object.values(pokemonData).filter(function (pokemon) {
        return pokemon['pokemon_name'].toLowerCase().indexOf(stringInName.toLowerCase()) !== -1;
    });
    filteredPokemon = Object.values(filteredPokemon).filter(function (pokemon) {
        return (pokemon['type'].toString().toLowerCase().indexOf(stringType.toLowerCase()) !== -1);
    });
    
    totalPages = Math.ceil(Object.keys(filteredPokemon).length / rowsPerPage);

    var paginatedPokemon = filteredPokemon.slice(startIndex, endIndex);

    paginatedPokemon.forEach(function (pokemon) {
        nodes.push(rowTemplate
            .replace("%pokemonId%", pokemon.pokemon_id)
            .replace("%pokemonIdPadded%", padInt(pokemon.pokemon_id))
            .replace("%pokemonName%", pokemon.pokemon_name)
        );
    });

    $("#pokemonList").empty().append(nodes);
    updatePageCounter();
}

function padInt(valueToPad) {
    return "000".slice(0, 3 - valueToPad.toString().length) + valueToPad;
}

function updatePageCounter() {
    $("#pageCounter").text("Page " + currentPage + " of " + totalPages);
}

function init() {
    for(const [pokemon_id, pokemon_value] of Object.entries(Pokemon.all_pokemons)){
        pokemonData[pokemon_id] = pokemon_value;
    }
    console.table(pokemonData)
    totalPages = Math.ceil(Object.keys(pokemonData).length / rowsPerPage);

    $("#loadingDiv").hide();
    $("#pokemonDiv").show();

    displayPokemon();
};

console.log("initializing...");
init();
console.log("done!");