class Type {
    static all_types = {}
    constructor(name, effectiveness) {
        this.name = name;
        this.effectiveness = effectiveness;
        Type.all_types[this.name] = this;
    }
  
    toString() {
        return `Type ${this.name} - Effectiveness : ${this.effectiveness}`;
    }
  }