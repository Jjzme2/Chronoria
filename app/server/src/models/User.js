class User {
	constructor(data) {
		this.id = data.id;
		this.username = data.username;
		this.email = data.email;
		this.applicationRoleId = data.application_role_id;
		this.createdAt = data.created_at;
		this.updatedAt = data.updated_at;
		this.active = data.active;
	}

	getEmpty() {
	  return {
          id: 0,
          username: "",
          email: "",
          password: "",
          applicationRoleId: "12a3bdaa-7880-4705-a59d-c06a7dade9af",
          createdAt: "",
          updatedAt: "",
          active: false,
        };
	}
}

export default User;