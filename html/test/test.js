const input = document.getElementById("param");

console.table(Pokemon.all_pokemons);

function getPokemonsByType(typeName){
    let res = [];
    for (const [pokemon_id, pokemon_value] of Object.entries(Pokemon.all_pokemons)){
        if (pokemon_value.type.includes(typeName)){
            res.push(pokemon_value);
        }
    }
    console.log(typeName);
    return res;
};

function getPokemonsByAttack(attackName){
    let res = [];
    for (const [pokemon_id, pokemon_value] of Object.entries(Pokemon.all_pokemons)){
        if (pokemon_value.attack.includes(attackName)){
            res.push(pokemon_value);
        }
    }
    return res;
}

function getAttacksByType(typeName){
    let res = [];
    for (const [attack_name, attack_value] of Object.entries(Attack.all_attacks)){
        if (attack_value.type == typeName){
            res.push(attack_value);
        }
    }
    return res;
}

function sortPokemonByName(){
    let res = [];
    for (const [pokemon_id, pokemon_value] of Object.entries(Pokemon.all_pokemons)){
        res.push(pokemon_value);
    };

    res.sort(function (a, b) {
        if (a.pokemon_name < b.pokemon_name) {
          return -1;
        }
        if (a.pokemon_name > b.pokemon_name) {
          return 1;
        }
        return 0;
    });
    return res;
}

function sortPokemonByStamina(){
    let res = [];
    for (const [pokemon_id, pokemon_value] of Object.entries(Pokemon.all_pokemons)){
        res.push(pokemon_value);
    };

    res.sort(function (a, b) {
        if (a.base_stamina > b.base_stamina) {
          return -1;
        }
        if (a.base_stamina < b.base_stamina) {
          return 1;
        }
        return 0;
    });
    return res;
}

function getWeakestEnemies(attack){
    // pour avoir l'objet attaque plutot que juste le nom
    attack = Attack.all_attacks[attack];

    let max_arr = {};

    // parcours tout les pokemons et ajoute un duo "clé : valeure" tel que "id pokemon : effectiveness de attack sur le pokemon en question"
    for (const [pokemon_id, pokemon_value] of Object.entries(Pokemon.all_pokemons)){
        if (pokemon_value.type.length > 1){
            max_arr[pokemon_id] = Type.all_types[attack.type].effectiveness[pokemon_value.type[0]] * Type.all_types[attack.type].effectiveness[pokemon_value.type[1]];
        }else{
            max_arr[pokemon_id] = Type.all_types[attack.type].effectiveness[pokemon_value.type[0]];
        }
    };

    // trouver l'effectiveness max
    max = 0;
    for (const [key, value] of Object.entries(max_arr)) {
        if (value > max) {
            max = value;
        }
    }

    // garder juste ceux égaux au max
    for (const [key, value] of Object.entries(max_arr)) {
        if (value < max){
            delete max_arr[key];
        }
    }

    // on met les 'objets' pokemon dans un Array en recuperant les clés des max (id)
    let res = [];
    for (const [key, value] of Object.entries(max_arr)) {
        res.push(Pokemon.all_pokemons[key]);
    }
    return res;
}

function getBestAttackTypesForEnemy(pokemonName){
    let pokemon;
    for (const [pokemon_id, pokemon_value] of Object.entries(Pokemon.all_pokemons)){
        if(pokemon_value.pokemon_name === pokemonName){
            pokemon = Pokemon.all_pokemons[pokemon_id];
        }
    }

    let max_arr = {};

    if (pokemon.type.length == 1) {
        for (const [type_name, type_value] of Object.entries(Type.all_types)){
            max_arr[type_name] = type_value.effectiveness[pokemon.type[0]];
        }
    }else{
        for (const [type_name, type_value] of Object.entries(Type.all_types)){
            max_arr[type_name] = type_value.effectiveness[pokemon.type[0]] * type_value.effectiveness[pokemon.type[1]];
        }
    }

    max = 0;
    for (const [key, value] of Object.entries(max_arr)) {
        if (value > max) {
            max = value;
        }
    }

    for (const [key, value] of Object.entries(max_arr)) {
        if (value < max){
            delete max_arr[key];
        }
    }

    let res = [];
    for (const [key, value] of Object.entries(max_arr)){
        res.push(Type.all_types[key]);
    }
    return res;
}