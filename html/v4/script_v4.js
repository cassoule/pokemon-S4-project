// Fonction pour ajouter des zéros à gauche d'un nombre
function padLeft(nr, n, str){
    return Array(n-String(nr).length+1).join(str||'0')+nr;
}

// Création d'une nouvelle ligne de tableau avec des en-têtes
let row = $('<tr/>');
row.append($('<td/>').html("ID"));
row.append($('<td/>').html("NAME"));
row.append($('<td/>').html("GEN"));
row.append($('<td/>').html("TYPE"));
row.append($('<td/>').html("STA"));
row.append($('<td/>').html("ATK"));
row.append($('<td/>').html("DEF"));
row.append($('<td/>').html("IMG"));
$("#thead").append(row);

// Sélection des éléments HTML et stockage dans des variables
var pokemonListDiv = $("#pokemonList");
var searchBox = $("#searchBox");
var searchBoxGen = $("#searchBoxGen");
var searchBoxType = $("#searchBoxType");
var currentPage = 1;
var rowsPerPage = 25;
var totalPages = 0;

// Événement pour la recherche en fonction du nom
searchBox.on('input', function (e) {
    displayPokemon(searchBox.val(), searchBoxGen.val(), searchBoxType.val(), 1);
});

// Événement pour la recherche en fonction de la génération
searchBoxGen.on('input', function (e) {
    displayPokemon(searchBox.val(), searchBoxGen.val(), searchBoxType.val(), 1);
});

// Événement pour la recherche en fonction du type
searchBoxType.on('input', function (e) {
    displayPokemon(searchBox.val(), searchBoxGen.val(), searchBoxType.val(), 1);
});

// Événement pour passer à la page précédente
$("#prevPage").on('click', function (e) {
    if (currentPage > 1) {
        currentPage--;
        displayPokemon(searchBox.val(), searchBoxGen.val(), searchBoxType.val(), currentPage);
    }
});

// Événement pour passer à la page suivante
$("#nextPage").on('click', function (e) {
    if (currentPage < totalPages) {
        currentPage++;
        displayPokemon(searchBox.val(), searchBoxGen.val(), searchBoxType.val(), currentPage);
    }
});

// Initialisation des données des Pokémon
var pokemonData = {}; 
var rowTemplate = '<tr onclick="openDetails(%pokemonIdParam%)"><td>%pokemonId%</td><td>%pokemonName%</td><td>%pokemonGen%</td><td>%pokemonType%</td><td>%pokemonSTA%</td><td>%pokemonATK%</td><td>%pokemonDEF%</td><td><img src="../webp/sprites/%pokemonIdPadded%MS.webp" /></td></tr>';

// Fonction pour afficher les Pokémon en fonction des filtres et de la pagination
function displayPokemon(searchString, searchGen, searchType, page) {
    scrollTo(0, 0);
    var stringInName = searchString || "";
    var stringGen = searchGen || "";
    var stringType = searchType || "";
    currentPage = page || 1;

    var nodes = [];
    var startIndex = (currentPage - 1) * rowsPerPage;
    var endIndex = startIndex + rowsPerPage;

    // Filtrage des Pokémon en fonction du nom
    var filteredPokemon = Object.values(pokemonData).filter(function (pokemon) {
        return pokemon['pokemon_name'].toLowerCase().indexOf(stringInName.toLowerCase()) !== -1;
    });
    // Filtrage des Pokémon en fonction de la génération
    filteredPokemon = Object.values(filteredPokemon).filter(function (pokemon) {
        let pokemon_gen = [];
        for (const [gen, gen_pokemons] of Object.entries(generation)) {
            for (let j = 0; j < gen_pokemons.length; j++) {
                if (gen_pokemons[j].id === pokemon.pokemon_id) {
                    pokemon_gen[pokemon.pokemon_id] = gen_pokemons[j].generation_number;
                    break;
                }
            }
        }
        if (pokemon_gen[pokemon.pokemon_id] == undefined) {
            pokemon_gen[pokemon.pokemon_id] = 0;
        }
        return (pokemon_gen[pokemon.pokemon_id].toString().toLowerCase().indexOf(stringGen.toLowerCase()) !== -1);
    });
    // Filtrage des Pokémon en fonction du type
    filteredPokemon = Object.values(filteredPokemon).filter(function (pokemon) {
        return (pokemon['type'].toString().toLowerCase().indexOf(stringType.toLowerCase()) !== -1);
    });
    
    // Calcul du nombre total de pages nécessaires pour la pagination
    totalPages = Math.ceil(Object.keys(filteredPokemon).length / rowsPerPage);

    // Pagination des Pokémon filtrés
    var paginatedPokemon = filteredPokemon.slice(startIndex, endIndex);

    // Création des éléments HTML pour chaque Pokémon paginé
    paginatedPokemon.forEach(function (pokemon) {
        nodes.push(rowTemplate
            .replace("%pokemonIdParam%", pokemon.pokemon_id)
            .replace("%pokemonId%", pokemon.pokemon_id)
            .replace("%pokemonIdPadded%", padLeft(pokemon.pokemon_id, 3))
            .replace("%pokemonName%", pokemon.pokemon_name)
            .replace("%pokemonGen%", function(){
                let gen_nbr = 0;
                for (const [gen, gen_pokemons] of Object.entries(generation)) {
                    for (let j = 0; j < gen_pokemons.length; j++) {
                        if (gen_pokemons[j].id === pokemon.pokemon_id) {
                            gen_nbr = gen_pokemons[j].generation_number;
                            break;
                        }
                    }
                    if (gen_nbr !== 0) {
                        break;
                    }
                }
                return gen_nbr;
            })
            .replace("%pokemonType%", pokemon.type.toString())
            .replace("%pokemonSTA%", pokemon.base_stamina)
            .replace("%pokemonATK%", pokemon.base_attack)
            .replace("%pokemonDEF%", pokemon.base_defense)
        );
    });

    // Remplacement du contenu de la liste de Pokémon avec les nouveaux éléments HTML
    $("#pokemonList").empty().append(nodes);
    // Mise à jour du compteur de page
    updatePageCounter();
}

// Fonction pour mettre à jour le compteur de page et gérer l'état des boutons de pagination
function updatePageCounter() {
    $("#pageCounter").text(padLeft(currentPage, 2) + "/" + padLeft(totalPages, 2));
    console.log(currentPage, totalPages);
    if(currentPage == 1){
        console.log("first")
        document.getElementById("prevPage").classList.add("inactive");
    }else{
        console.log("notfirst")
        document.getElementById("prevPage").classList.remove("inactive");
    }
    if(currentPage == totalPages){
        console.log("last")
        document.getElementById("nextPage").classList.add("inactive");
    }else{
        console.log("notlast")
        document.getElementById("nextPage").classList.remove("inactive");
    }
}

// Fonction d'initialisation de la page
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

// Initialisation de la page
init();

// Fonctions pour ouvrir et fermer les détails d'un Pokémon
let details = document.getElementById("details");
let card = document.getElementById("card");
function openDetails(x){
    scrollTo(0,0)
    document.getElementById("body").style.overflow = "hidden";
    if (details.classList.contains("inactive")){
        details.classList.remove("inactive")
        console.log(Pokemon.all_pokemons[x].toString())
        if (Pokemon.all_pokemons[x].type.length === 1){
            card.innerHTML += 
            `<div id="img-container">
                <img id="pokemon_img" src="../webp/thumbnails/${padLeft(x, 3)}.webp"></img>
            </div>
            <div id="name_type">
                <h2>${Pokemon.all_pokemons[x].pokemon_name}</h2>
                <h4>${Pokemon.all_pokemons[x].type[0]}</h4>
            </div>
            <div class="stats">
                <h4>${Pokemon.all_pokemons[x].base_attack} <span>ATK</span></h4>
                <h4>${Pokemon.all_pokemons[x].base_defense} <span>DEF</span></h4>
                <h4>${Pokemon.all_pokemons[x].base_stamina} <span>STA</span></h4>
            </div>
            <div id="attacks">
                <div id="charged_attacks"><h3>Charged moves</h3></div>
                <div id="fast_attacks"><h3>Fast moves</h3></div>
            </div>
            `
        }else{
            card.innerHTML += 
            `<div id="img-container">
                <img id="pokemon_img" src="../webp/thumbnails/${padLeft(x, 3)}.webp"></img>
            </div>
            <div id="name_type">
                <h2>${Pokemon.all_pokemons[x].pokemon_name}</h2>
                <h4>${Pokemon.all_pokemons[x].type[0]} & ${Pokemon.all_pokemons[x].type[1]}</h4>
            </div>
            <div class="stats">
                <h4>${Pokemon.all_pokemons[x].base_attack} <span>ATK</span></h4>
                <h4>${Pokemon.all_pokemons[x].base_defense} <span>DEF</span></h4>
                <h4>${Pokemon.all_pokemons[x].base_stamina} <span>STA</span></h4>
            </div>
            <div id="attacks">
                <div id="charged_attacks"><h3>Charged moves</h3></div>
                <div id="fast_attacks"><h3>Fast moves</h3></div>
            </div>
            `
        }
        
        let charged_attacks_div = document.getElementById("charged_attacks");
        for (let i = 0; i < Pokemon.all_pokemons[x].charged_attack.length; i++){
            charged_attacks_div.innerHTML +=
            `
            <h4>${Pokemon.all_pokemons[x].charged_attack[i]}<span>${Attack.all_attacks[Pokemon.all_pokemons[x].charged_attack[i]].type}</span></h4>
            `
        }
        let fast_attacks_div = document.getElementById("fast_attacks");
        for (let i = 0; i < Pokemon.all_pokemons[x].fast_attack.length; i++){
            fast_attacks_div.innerHTML +=
            `
            <h4>${Pokemon.all_pokemons[x].fast_attack[i]}<span>${Attack.all_attacks[Pokemon.all_pokemons[x].fast_attack[i]].type}</span></h4>
            `
        }
        let big_container = document.getElementById("big-img-container");
        document.getElementById("pokemon_img").addEventListener(
            "mouseenter",
            function(event){
                big_container.style.visibility = "visible";
                big_container.innerHTML +=
                `
                <img id="big-img" src="../webp/images/${padLeft(x, 3)}.webp"></img>
                `
        })
        document.getElementById("pokemon_img").addEventListener(
            "mouseout",
            function(event){
                big_container.style.visibility = "hidden";
                big_container.innerHTML = ``;
            }
        )
    }
}

function closeDetails(){
    details.classList.add("inactive");
    document.getElementById("body").style.overflow = "visible";
    card.innerHTML = ``;
}
