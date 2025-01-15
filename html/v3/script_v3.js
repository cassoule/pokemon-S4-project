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

// Initialisation des variables pour le compteur de pages
let currentPage = 0;
const pageSize = 25;
const totalRows = Object.keys(Pokemon.all_pokemons).length;
const totalPages = Math.ceil(totalRows / pageSize);

// Fonction pour afficher les pokemons de la page actuelle
function renderTable(page) {
    $("#tbody").empty(); // Vider les lignes précédentes
    
    // Parcourir chaque pokemon de la page actuelle
    for (let i = page * pageSize; i < Math.min((page + 1) * pageSize, totalRows); i++) {
        const [pokemon_id, pokemon_value] = Object.entries(Pokemon.all_pokemons)[i];
        
        // Création de la ligne
        let row = $(`<tr class="${pokemon_value.pokemon_id}" onclick="openDetails(this)"></tr>`);
        row.append($('<td/>').html(pokemon_value.pokemon_id));
        row.append($('<td/>').html(pokemon_value.pokemon_name));
        let gen_nbr = 0;
        for (const [gen, gen_pokemons] of Object.entries(generation)) {
            for (let j = 0; j < gen_pokemons.length; j++) {
                if (gen_pokemons[j].id === pokemon_value.pokemon_id) {
                    gen_nbr = gen_pokemons[j].generation_number;
                    break;
                }
            }
            if (gen_nbr !== 0) {
                break;
            }
        }
        row.append($('<td/>').html(gen_nbr));
        if (pokemon_value.type.length == 1) {
            row.append($('<td/>').html(pokemon_value.type));
        } else {
            row.append($('<td/>').html(`${pokemon_value.type[0]} & ${pokemon_value.type[1]}`));
        }
        row.append($('<td/>').html(pokemon_value.base_stamina));
        row.append($('<td/>').html(pokemon_value.base_attack));
        row.append($('<td/>').html(pokemon_value.base_defense));
        let image = padLeft(pokemon_id, 3);
        let url = `${image}MS.webp"/>`
        if (pokemon_id > 809) url = `${image}.webp"/>`;
        row.append($('<td/>').html(`<img src="../webp/sprites/${url}`));
        $("#tbody").append(row);  // ajout de la ligne à la table
    }

    // Mise à jour du compteur de page
    $(".compteur").html(`${padLeft(currentPage + 1, totalPages.toString().length)}/${totalPages}`);

    let prec = document.getElementById("prec");
    let suiv = document.getElementById("suiv");
    if (currentPage === 0){
        prec.classList.add("inactive");
    } else if (currentPage === totalPages - 1){
        suiv.classList.add("inactive");
    } else {
        prec.classList.remove("inactive");
        suiv.classList.remove("inactive");
    }
}

// Evenement pour passer à la page suivante
$(".suiv").on("click", function() {
    if (currentPage < totalPages - 1) {
        currentPage++;
        renderTable(currentPage);
    }
});

// Evenement pour passer à la page précédente
$(".prec").on("click", function() {
    if (currentPage > 0) {
        currentPage--;
        renderTable(currentPage);
    }
});

// Initialisation de la table
renderTable(currentPage);

// Fonctions pour ouvrir et fermer les détails d'un pokemon
let details = document.getElementById("details");
let card = document.getElementById("card");
function openDetails(x){ 
    if (details.classList.contains("inactive")){
        details.classList.remove("inactive")
        console.log(Pokemon.all_pokemons[x.classList[0]].toString())
        if (Pokemon.all_pokemons[x.classList[0]].type.length === 1){
            card.innerHTML += 
            `<div id="img-container">
                <img id="pokemon_img" src="../webp/thumbnails/${padLeft(x.classList[0], 3)}.webp"></img>
            </div>
            <div id="name_type">
                <h2>${Pokemon.all_pokemons[x.classList[0]].pokemon_name}</h2>
                <h4>${Pokemon.all_pokemons[x.classList[0]].type[0]}</h4>
            </div>
            <div class="stats">
                <h4>${Pokemon.all_pokemons[x.classList[0]].base_attack} <span>ATK</span></h4>
                <h4>${Pokemon.all_pokemons[x.classList[0]].base_defense} <span>DEF</span></h4>
                <h4>${Pokemon.all_pokemons[x.classList[0]].base_stamina} <span>STA</span></h4>
            </div>
            <div id="attacks">
                <div id="charged_attacks"><h3>Charged moves</h3></div>
                <div id="fast_attacks"><h3>Fast moves</h3></div>
            </div>
            `
        }else{
            card.innerHTML += 
            `<div id="img-container">
                <img id="pokemon_img" src="../webp/thumbnails/${padLeft(x.classList[0], 3)}.webp"></img>
            </div>
            <div id="name_type">
                <h2>${Pokemon.all_pokemons[x.classList[0]].pokemon_name}</h2>
                <h4>${Pokemon.all_pokemons[x.classList[0]].type[0]} & ${Pokemon.all_pokemons[x.classList[0]].type[1]}</h4>
            </div>
            <div class="stats">
                <h4>${Pokemon.all_pokemons[x.classList[0]].base_attack} <span>ATK</span></h4>
                <h4>${Pokemon.all_pokemons[x.classList[0]].base_defense} <span>DEF</span></h4>
                <h4>${Pokemon.all_pokemons[x.classList[0]].base_stamina} <span>STA</span></h4>
            </div>
            <div id="attacks">
                <div id="charged_attacks"><h3>Charged moves</h3></div>
                <div id="fast_attacks"><h3>Fast moves</h3></div>
            </div>
            `
        }
        
        let charged_attacks_div = document.getElementById("charged_attacks");
        for (let i = 0; i < Pokemon.all_pokemons[x.classList[0]].charged_attack.length; i++){
            charged_attacks_div.innerHTML +=
            `
            <h4>${Pokemon.all_pokemons[x.classList[0]].charged_attack[i]}<span>${Attack.all_attacks[Pokemon.all_pokemons[x.classList[0]].charged_attack[i]].type}</span></h4>
            `
        }
        let fast_attacks_div = document.getElementById("fast_attacks");
        for (let i = 0; i < Pokemon.all_pokemons[x.classList[0]].fast_attack.length; i++){
            fast_attacks_div.innerHTML +=
            `
            <h4>${Pokemon.all_pokemons[x.classList[0]].fast_attack[i]}<span>${Attack.all_attacks[Pokemon.all_pokemons[x.classList[0]].fast_attack[i]].type}</span></h4>
            `
        }
        let big_container = document.getElementById("big-img-container");
        document.getElementById("pokemon_img").addEventListener(
            "mouseenter",
            function(event){
                big_container.style.visibility = "visible";
                big_container.innerHTML +=
                `
                <img id="big-img" src="../webp/images/${padLeft(x.classList[0], 3)}.webp"></img>
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
    card.innerHTML = ``;
}