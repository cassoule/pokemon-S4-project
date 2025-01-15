function padLeft(nr, n, str){
    return Array(n-String(nr).length+1).join(str||'0')+nr;
}

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

for (const [pokemon_id, pokemon_value] of Object.entries(Pokemon.all_pokemons)){
    let row = $('<tr/>');
    row.append($('<td/>').html(pokemon_value.pokemon_id));
    row.append($('<td/>').html(pokemon_value.pokemon_name));
    let gen_nbr = 0;
    for (const [gen, gen_pokemons] of Object.entries(generation)){
        for (let i = 0; i < gen_pokemons.length; i++){
            if (gen_pokemons[i].id === pokemon_value.pokemon_id){
                gen_nbr = gen_pokemons[i].generation_number;
                break;
            }
        }
        if (gen_nbr !== 0){
            break;
        }
    }
    row.append($('<td/>').html(gen_nbr));
    if (pokemon_value.type.length == 1){
        row.append($('<td/>').html(pokemon_value.type));
    }else{
        row.append($('<td/>').html(`${pokemon_value.type[0]} & ${pokemon_value.type[1]}`));
    }
    row.append($('<td/>').html(pokemon_value.base_stamina));
    row.append($('<td/>').html(pokemon_value.base_attack));
    row.append($('<td/>').html(pokemon_value.base_defense));
    let image = padLeft(pokemon_id, 3);  // exemple : pokemon_id = 4 -> image = "004"
    let url = `${image}MS.webp"/>`
    if (pokemon_id > 809) url = `${image}.webp"/>`;
    row.append($('<td/>').html(`<img src="../webp/sprites/${url}`));
    $("#table").append(row);
}