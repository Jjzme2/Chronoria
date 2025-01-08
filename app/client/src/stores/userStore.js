import { defineStore } from "pinia";
import { refreshAccessToken, logout, decodeJwt } from '@/utils/authUtils';

export const useUserStore = defineStore("users", {
  state: () => ({
    items: [],
    currentUser: null,
  }),
  getters: {
    getUserById: (state) => (id) => state.items.find((user) => user.id === id),
    getUserByUsername: (state) => (username) =>
      state.items.find((user) => user.username === username),
    isLoggedIn: (state) => state.currentUser !== null,
  },
  actions: {
    async fetchAll() {
      try {
        const response = await fetch("/api/user");
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const users = await response.json();
        this.items = users;
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    },
    async login(username, password) {
      try {
        const response = await fetch("/api/user/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        });
        if (!response.ok) {
          throw new Error("Failed to login");
        }
        const user = await response.json();
        this.currentUser = user.decoded;
        localStorage.setItem('accessToken', user.accessToken);
        await this.getRefreshToken();
      } catch (error) {
        console.error("Error logging in:", error);
      }
    },
    async logout() {
      const response = await fetch("/api/user/logout", {
        method: "POST",
      });
      if (!response.ok) {
        console.error("Failed to logout");
      }
      this.currentUser = null;
      logout();
    },
    async getRefreshToken() {
      try {
        const newAccessToken = await refreshAccessToken();
        if (newAccessToken) {
          this.currentUser = decodeJwt(newAccessToken);
        } else {
          logout();
        }
      } catch (error) {
        console.error("Error refreshing token:", error);
        logout();
      }
    },
  },
});
