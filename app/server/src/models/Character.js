class Character {
  constructor(data) {
	console.log("Data: ", data)
    this.id = data.id;
    this.name = data.name;
    this.level = data.level;
	if(!data.class_name){
		console.error("Class name(class_name) is required, but was not provided");
		return;
	}
    this.class_name = data.class_name;
	this.class_id = data.class_id;
  }
}

export default Character;
