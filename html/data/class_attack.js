class Attack {
    static all_attacks = {}
    constructor(move_id, name, duration, energy_delta, power, stamina_loss_scaler, critical_chance, type) {
        this.move_id = move_id;
        this.name = name;
        this.duration = duration;
        this.energy_delta = energy_delta;
        this.power = power;
        this.stamina_loss_scaler = stamina_loss_scaler;
        this.critical_chance = critical_chance;
        this.type = type;
        Attack.all_attacks[this.name] = this;
    }

    toString() {
        return `Attack ${this.name} #${this.id}`;
    }
}