<template>
  <div class="logout">
    <h2>Logout</h2>
    <button @click="handleLogout">Logout</button>
  </div>
</template>

<script>
export default {
  methods: {
    handleLogout() {
      // Clear the token from local storage
      localStorage.removeItem('token');
      
      // Redirect to the login page
      window.location.href = '/login';
    }
  }
};
</script>

<style scoped>
.logout {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
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
