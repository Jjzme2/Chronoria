<template>
  <div class="register">
    <h2>Register</h2>
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="username">Username:</label>
        <input type="text" v-model="username" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" v-model="password" required />
      </div>
      <div>
        <label for="applicationRole">Application Role:</label>
        <input type="text" v-model="applicationRole" required />
      </div>
      <div>
        <label for="communityRole">Community Role:</label>
        <input type="text" v-model="communityRole" required />
      </div>
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      applicationRole: '',
      communityRole: ''
    };
  },
  methods: {
    async handleSubmit() {
      if (this.validateForm()) {
        try {
          const response = await fetch('/api/user/create', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              username: this.username,
              password: this.password,
              applicationRole: this.applicationRole,
              communityRole: this.communityRole
            })
          });
          if (!response.ok) {
            throw new Error('Failed to register');
          }
          alert('User registered successfully');
        } catch (error) {
          console.error('Error:', error);
          alert('Error registering user');
        }
      } else {
        alert('Please fill in all fields');
      }
    },
    validateForm() {
      return this.username && this.password && this.applicationRole && this.communityRole;
    }
  }
};
</script>

<style scoped>
.register {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
}
form div {
  margin-bottom: 10px;
}
label {
  display: block;
  margin-bottom: 5px;
}
input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}
button {
  width: 100%;
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
button:hover {
  background-color: #45a049;
}
</style>
