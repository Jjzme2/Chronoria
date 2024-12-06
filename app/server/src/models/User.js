class User {
	constructor(user) {
		this.id = user.id;
		this.username = user.username;
		this.email = user.email;
		this.password = user.password;
		this.applicationRoleId = user.applicationRoleId;
		this.createdAt = user.createdAt;
		this.updatedAt = user.updatedAt;
		this.active = user.active;
	}
}

export default User;