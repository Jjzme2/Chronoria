class Class {
  constructor(data) {
    this.id = data.id;
	this.name = data.name;
	this.baseHP = data.base_health * 10;
	this.baseAtk = data.base_attack;
	this.baseDef = data.base_defense;
	this.baseSpd = data.base_speed;
  }

  getEmpty() {
	    return {
        id: 0,
        name: "",
		baseHP: 0,
		baseAtk: 0,
		baseDef: 0,
		baseSpd: 0
      };
  }
}

export default Class;
