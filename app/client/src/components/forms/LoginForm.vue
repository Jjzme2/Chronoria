<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="login">
      <label for="username">Username</label>
      <input type="text" id="username" v-model="username" required>
      <label for="password">Password</label>
      <input type="password" id="password" v-model="password" required>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useUserStore } from '@/stores/userStore';

const userStore = useUserStore();

const username = ref('');
const password = ref('');

const login = async () => {
  await userStore.login(username.value, password.value);
};
</script>