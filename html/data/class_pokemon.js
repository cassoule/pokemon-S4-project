class Pokemon {
  static all_pokemons = {}
  constructor(pokemon_id, pokemon_name, base_attack, base_defense, base_stamina) {
    this.pokemon_id = pokemon_id;
    this.pokemon_name = pokemon_name;
    this.base_attack = base_attack;
    this.base_defense = base_defense;
    this.base_stamina = base_stamina;
    this.type = [];
    this.attack = [];
    Pokemon.all_pokemons[this.pokemon_id] = this;
  }

  toString() {
    return `Pokemon n°${this.pokemon_id} : ${this.pokemon_name} | ATK : ${this.base_attack} | DEF : ${this.base_defense} | STA : ${this.base_stamina}`;
  }

  getTypes() {
    let res = [];

    this.type.forEach(element => {
        res.push(Type.all_types[element]);
    })

    return res;
  }

  getAttacks() {
    let res = [];

    this.attack.forEach(element => {
        res.push(Attack.all_attacks[element]);
    })

    return res;
  }
}

function import_pokemon() {
    // pokemon (Pokemon.all_pokemons)
    pokemon.forEach(element => {
        if (element.form === "Normal") {
            new Pokemon(element.pokemon_id,
                        element.pokemon_name,
                        element.base_attack,
                        element.base_defense,
                        element.base_stamina);
        }
    });

    // type (Type.all_types)
    pokemon_type.forEach(element => {
        if (element.form === "Normal") {
            element.type.forEach(elem => {
                new Type(elem, type_effectiveness[elem])
        })
        }
    });
  
    // associe pokemon et type
    pokemon_type.forEach(element => {
        if (element.form === "Normal") {
            if (element["type"].length > 1) {
                Pokemon.all_pokemons[element["pokemon_id"]].type.push(element["type"][0]);
                Pokemon.all_pokemons[element["pokemon_id"]].type.push(element["type"][1]);
                } else {
                Pokemon.all_pokemons[element["pokemon_id"]].type.push(element["type"][0]);
                }
            }
    });

    // attack (Attack.all_attacks)
    fast_moves.forEach(element => {
        new Attack(element["move_id"], element["name"], element["duration"], element["energy_delta"], element["power"], element["stamina_loss_scaler"], null, element["type"]);
    });
    charged_moves.forEach(element => {
        new Attack(element["move_id"], element["name"], element["duration"], element["energy_delta"], element["power"], element["stamina_loss_scaler"], element["critical_chance"], element["type"]);
    });

    // associe pokemon et attack
    pokemon_moves.forEach(element => {
        if (element.form === "Normal") {
            element.charged_moves.forEach(elem => {
                Pokemon.all_pokemons[element.pokemon_id].attack.push(elem);
            });
            element.elite_charged_moves.forEach(elem => {
                Pokemon.all_pokemons[element.pokemon_id].attack.push(elem);
            });
            element.elite_fast_moves.forEach(elem => {
                Pokemon.all_pokemons[element.pokemon_id].attack.push(elem);
            });
            element.fast_moves.forEach(elem => {
                Pokemon.all_pokemons[element.pokemon_id].attack.push(elem);
            });
        }
    });
};

import_pokemon();
// console.log(Type.all_types); 
// console.log(Attack.all_attacks);
// console.log(Pokemon.all_pokemons);
// console.log(Pokemon.all_pokemons["1"].getTypes());
// console.log(Pokemon.all_pokemons["1"].getAttacks());
