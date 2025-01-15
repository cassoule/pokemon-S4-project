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
    $("#tbody").empty(); // Clear previous rows
    
    // Parcourir chaque pokemon de la page actuelle
    for (let i = page * pageSize; i < Math.min((page + 1) * pageSize, totalRows); i++) {
        const [pokemon_id, pokemon_value] = Object.entries(Pokemon.all_pokemons)[i];
        
        // Création de la ligne
        let row = $('<tr/>');
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
        // Ajout de la ligne à la table
        $("#tbody").append(row);
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