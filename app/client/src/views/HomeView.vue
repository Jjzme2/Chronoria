<template>
  <div>
    <div v-if="isLoggedIn">
      <h1>Welcome to Chronoria, {{ currentUser.username }}!</h1>
      <p>Your token will expire at: {{ expirationTime }}</p>
    </div>
    <div v-else>
      <LoginForm />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import LoginForm from '../components/forms/LoginForm.vue';
import { useUserStore } from '@/stores/userStore';

const userStore = useUserStore();
const isLoggedIn = computed(() => userStore.isLoggedIn);
const currentUser = computed(() => userStore.currentUser);

const expirationTime = computed(() => {
  const user = currentUser.value; // Access the `.value` of the reactive object
  console.log(user); // Log the user object to verify
  if (user && user.exp) {
    const expTimestamp = user.exp * 1000; // Convert seconds to milliseconds
    return new Date(expTimestamp).toLocaleString(); // Convert to a human-readable string
  }
  return 'N/A'; // Fallback if `exp` is not available
});
</script>
